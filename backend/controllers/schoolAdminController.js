const db = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. Dashboard Stats
exports.getSchoolDashboardStats = async (req, res) => {
  try {
    const { email } = req.params;

    const schoolResult = await db.query('SELECT * FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });
    
    const schoolName = schoolResult.rows[0].name;

    let totalTeachers = 0, totalStudents = 0, totalParents = 0;
    try {
      const teacherCount = await db.query('SELECT COUNT(*) FROM teachers WHERE school_name = $1', [schoolName]);
      totalTeachers = parseInt(teacherCount.rows[0].count, 10);
      const studentCount = await db.query('SELECT COUNT(*) FROM students WHERE school_name = $1', [schoolName]); 
      totalStudents = parseInt(studentCount.rows[0].count, 10);
      const parentCount = await db.query('SELECT COUNT(*) FROM parents');
      totalParents = parseInt(parentCount.rows[0].count, 10);
    } catch (e) { console.error("Query error", e); }

    res.json({
      overallStats: { students: totalStudents, teachers: totalTeachers, parents: totalParents, classes: Math.floor(totalStudents / 30) || 0 },
      dailyStats: { studentAttendance: { present: 0, total: totalStudents, percentage: 0 }, teacherAttendance: { present: 0, total: totalTeachers, percentage: 0 }, staffLeave: { approved: 0, pending: 0 }, eventsToday: { count: 0, nextEvent: "No events scheduled" } },
      notices: [], events: []   
    });
  } catch (error) { res.status(500).json({ error: "Server error fetching dashboard data." }); }
};

// 2. Get Teachers
exports.getTeachers = async (req, res) => {
  try {
    const { email } = req.params;
    const schoolResult = await db.query('SELECT id FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });
    
    const teachersResult = await db.query('SELECT id, full_name, email, phone_number, staff_id, department, subject, medium, status, created_at FROM teachers WHERE school_id = $1 ORDER BY created_at DESC', [schoolResult.rows[0].id]);
    res.json(teachersResult.rows);
  } catch (error) { res.status(500).json({ error: "Failed to fetch teachers." }); }
};

// 3. Add Teacher
exports.addTeacher = async (req, res) => {
  try {
    const { email } = req.params; 
    const { fullName, teacherEmail, phone, staffId, department, subject, medium, password } = req.body;
    const schoolResult = await db.query('SELECT id, name FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      `INSERT INTO teachers (full_name, email, phone_number, password, staff_id, department, subject, medium, school_name, school_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, full_name, email`,
      [fullName, teacherEmail.toLowerCase().trim(), phone, hashedPassword, staffId, department, subject, medium, schoolResult.rows[0].name, schoolResult.rows[0].id]
    );
    res.status(201).json({ message: "Teacher added successfully!", teacher: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: "A teacher with this Email or Staff ID already exists." });
    res.status(500).json({ error: "Failed to add teacher." });
  }
};

// 4. Update Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { email, teacherId } = req.params; 
    const { fullName, teacherEmail, phone, staffId, department, subject, medium, status } = req.body;
    const schoolResult = await db.query('SELECT id FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });

    const result = await db.query(
      `UPDATE teachers SET full_name = $1, email = $2, phone_number = $3, staff_id = $4, department = $5, subject = $6, medium = $7, status = $8 WHERE id = $9 AND school_id = $10 RETURNING *`,
      [fullName, teacherEmail.toLowerCase().trim(), phone, staffId, department, subject, medium, status, teacherId, schoolResult.rows[0].id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Teacher not found or unauthorized." });
    res.json({ message: "Teacher updated successfully!", teacher: result.rows[0] });
  } catch (error) { res.status(500).json({ error: "Failed to update teacher." }); }
};

// --- CLASS MANAGEMENT ---

// 5. Get Classes
exports.getClasses = async (req, res) => {
  try {
    const { email } = req.params;
    const schoolResult = await db.query('SELECT id FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });
    
    const classesResult = await db.query(
      `SELECT c.*, t.full_name as class_teacher_name 
       FROM classes c LEFT JOIN teachers t ON c.class_teacher_id = t.id 
       WHERE c.school_id = $1 ORDER BY c.grade, c.section`,
      [schoolResult.rows[0].id]
    );
    res.json(classesResult.rows);
  } catch (error) { res.status(500).json({ error: "Failed to fetch classes." }); }
};

// 6. Add Class
exports.addClass = async (req, res) => {
  try {
    const { email } = req.params;
    const { grade, section, classTeacherId, roomNumber, capacity } = req.body;
    const schoolResult = await db.query('SELECT id FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });
    
    const teacherId = classTeacherId && classTeacherId.trim() !== '' ? classTeacherId : null;

    const result = await db.query(
      `INSERT INTO classes (school_id, grade, section, class_teacher_id, room_number, capacity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [schoolResult.rows[0].id, grade, section, teacherId, roomNumber, capacity || 40]
    );
    res.status(201).json({ message: "Class added successfully!", classData: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: "This class section already exists." });
    res.status(500).json({ error: "Failed to add class." });
  }
};

// --- TIMETABLE MANAGEMENT ---

// 7. Get Class Timetable
exports.getClassTimetable = async (req, res) => {
  try {
    const { classId } = req.params;
    const result = await db.query(
      `SELECT ct.*, t.full_name as teacher_name 
       FROM class_timetables ct LEFT JOIN teachers t ON ct.teacher_id = t.id 
       WHERE ct.class_id = $1`, [classId]
    );
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: "Failed to fetch timetable." }); }
};

// 8. Save Timetable Slot
exports.saveTimetableSlot = async (req, res) => {
  try {
    const { email, classId } = req.params;
    const { dayOfWeek, periodNumber, timeSlot, subject, teacherId } = req.body;
    const schoolResult = await db.query('SELECT id FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });

    const tId = teacherId && teacherId.trim() !== '' ? teacherId : null;

    const result = await db.query(
      `INSERT INTO class_timetables (school_id, class_id, day_of_week, period_number, time_slot, subject, teacher_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (class_id, day_of_week, period_number) 
       DO UPDATE SET subject = EXCLUDED.subject, teacher_id = EXCLUDED.teacher_id, time_slot = EXCLUDED.time_slot
       RETURNING *`,
      [schoolResult.rows[0].id, classId, dayOfWeek, periodNumber, timeSlot, subject, tId]
    );
    res.json({ message: "Slot updated successfully", slot: result.rows[0] });
  } catch (error) { res.status(500).json({ error: "Failed to save slot." }); }
};

// 9. Get Teacher Timetable
exports.getTeacherTimetable = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await db.query(
      `SELECT ct.day_of_week, ct.period_number, ct.time_slot, ct.subject, c.grade, c.section, c.room_number 
       FROM class_timetables ct JOIN classes c ON ct.class_id = c.id 
       WHERE ct.teacher_id = $1`, [teacherId]
    );
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: "Failed to fetch teacher timetable." }); }
};

// --- SMART MESSAGING SYSTEM ---

// 10. Send a message from Admin to Staff
exports.sendStaffMessage = async (req, res) => {
  try {
    const { email } = req.params;
    const { recipientType, targetSection, targetTeacherId, subject, messageBody } = req.body;

    const schoolResult = await db.query('SELECT id, admin_name FROM schools WHERE email = $1', [email]);
    if (schoolResult.rows.length === 0) return res.status(404).json({ error: "School not found" });
    const school = schoolResult.rows[0];

    let targetGroup = null;
    if (recipientType === 'section') targetGroup = targetSection;
    if (recipientType === 'individual') targetGroup = targetTeacherId;

    const result = await db.query(
      `INSERT INTO internal_messages (school_id, sender_name, recipient_type, target_group, subject, message_body)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [school.id, school.admin_name || 'Admin', recipientType, targetGroup, subject, messageBody]
    );

    res.status(201).json({ message: "Message sent successfully!", data: result.rows[0] });
  } catch (error) {
    console.error("Send Message Error:", error.message);
    res.status(500).json({ error: "Failed to send message." });
  }
};

// 11. Fetch messages for a specific Teacher (For the Mobile App)
exports.getTeacherMessages = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacherResult = await db.query('SELECT school_id, department FROM teachers WHERE id = $1', [teacherId]);
    if (teacherResult.rows.length === 0) return res.status(404).json({ error: "Teacher not found" });
    const teacher = teacherResult.rows[0];

    const messagesResult = await db.query(
      `SELECT * FROM internal_messages 
       WHERE school_id = $1 
       AND (
         recipient_type = 'all' 
         OR (recipient_type = 'section' AND target_group = $2) 
         OR (recipient_type = 'individual' AND target_group = $3)
       )
       ORDER BY created_at DESC`,
      [teacher.school_id, teacher.department, teacherId]
    );

    res.json(messagesResult.rows);
  } catch (error) {
    console.error("Get Messages Error:", error.message);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};