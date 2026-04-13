const db = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. Get Dashboard Stats and Lists
exports.getDashboardData = async (req, res) => {
  try {
    const schoolsCountResult = await db.query('SELECT COUNT(*) FROM schools');
    const totalSchools = parseInt(schoolsCountResult.rows[0].count, 10);
    
    let totalStudents = 0;
    try {
      const studentsCount = await db.query('SELECT COUNT(*) FROM students');
      totalStudents = parseInt(studentsCount.rows[0].count, 10);
    } catch (e) { console.error("Error counting students:", e.message); }

    let totalParents = 0;
    try {
      const parentsCount = await db.query('SELECT COUNT(*) FROM parents');
      totalParents = parseInt(parentsCount.rows[0].count, 10);
    } catch (e) { console.error("Error counting parents:", e.message); }

    const pendingSchools = await db.query(
      `SELECT id, name, admin_name as contact, email, phone, created_at as date, status 
       FROM schools WHERE status = 'Pending' ORDER BY created_at DESC`
    );

    const activeSchools = await db.query(
      `SELECT id, name, admin_name as contact, email, phone, created_at as joined, status, student_count as students
       FROM schools WHERE status = 'Active' ORDER BY created_at DESC LIMIT 5`
    );

    res.json({
      stats: { totalSchools, totalStudents, totalParents, systemHealth: "99.9%" },
      pendingApprovals: pendingSchools.rows,
      recentSchools: activeSchools.rows
    });
  } catch (error) {
    console.error("Dashboard Controller Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. Update School Status (Approve/Decline/Toggle)
exports.updateSchoolStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await db.query(
      'UPDATE schools SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "School not found" });
    res.json({ message: `Status updated to ${status}`, school: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get All Schools (For the Manage Schools Table)
exports.getAllSchools = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM schools ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error("Get All Schools Error:", error.message);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
};

// 4. Create a New School (From the Add School Modal)
exports.createSchool = async (req, res) => {
  try {
    const { schoolName, adminName, email, phone, schoolCategory, schoolGender, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const countResult = await db.query('SELECT COUNT(*) FROM schools');
    const nextNumber = parseInt(countResult.rows[0].count, 10) + 1;
    const schoolId = `SCH-${nextNumber.toString().padStart(3, '0')}`;

    const result = await db.query(
      `INSERT INTO schools (id, name, admin_name, email, phone, school_category, student_type, password, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Active') RETURNING *`,
      [schoolId, schoolName, adminName, email, phone, schoolCategory, schoolGender, hashedPassword]
    );

    res.status(201).json({ message: "School created successfully", school: result.rows[0] });
  } catch (error) {
    console.error("Create School Error:", error.message);
    if (error.code === '23505') return res.status(400).json({ error: "A school with this email already exists." });
    res.status(500).json({ error: "Failed to create school" });
  }
};

// 5. Delete a School (With Super Admin Password Verification)
exports.deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // 1. Fetch the Super Admin account (we grab the first one since you are the only one)
    const adminResult = await db.query("SELECT * FROM super_admins WHERE email = 'super@admin.com'");
    if (adminResult.rows.length === 0) {
      return res.status(500).json({ error: "Super admin account not found in database." });
    }

    const superAdmin = adminResult.rows[0];

    // 2. Verify the provided password against the hashed database password
    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect Super Admin password. Deletion denied." });
    }

    // 3. If password matches, permanently delete the school
    const deleteResult = await db.query("DELETE FROM schools WHERE id = $1 RETURNING *", [id]);
    
    if (deleteResult.rows.length === 0) {
      return res.status(404).json({ error: "School not found." });
    }

    res.json({ message: "School permanently deleted." });
  } catch (error) {
    console.error("Delete School Error:", error.message);
    res.status(500).json({ error: "Failed to delete school." });
  }
};