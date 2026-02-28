import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Modal,
  Platform
} from "react-native";
import { FontAwesome6, Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function StudentScreen() {
  const router = useRouter();

  // --- DASHBOARD STATES ---
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isAttendanceModalVisible, setAttendanceModalVisible] = useState(false);

  // --- ONGOING SUBJECTS STATES ---
  const [isSubjectModalVisible, setSubjectModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    setCurrentDate(`${dayName}, ${dayNum} ${monthName} ${year}`);
  }, []);

  // --- MOCK DATA ---
  const ongoingSubjects = [
    { id: "1", name: "Combined Mathematics", teacher: "Mr. Perera", icon: "sigma", color: "#2563EB", bg: "#EFF6FF" },
    { id: "2", name: "Physics", teacher: "Mrs. Silva", icon: "flask", color: "#7C3AED", bg: "#F5F3FF" },
    { id: "3", name: "Chemistry", teacher: "Mr. Fernando", icon: "vial", color: "#059669", bg: "#ECFDF5" },
  ];

  const subjectMaterials = {
    videos: [
      { id: "v1", title: "Calculus Part 1: Limits & Continuity", duration: "45 mins" },
      { id: "v2", title: "Calculus Part 2: Derivatives", duration: "50 mins" },
    ],
    notes: [
      { id: "n1", title: "Unit 4: Limits and Continuity Full Notes", size: "2.4 MB" },
      { id: "n2", title: "Differentiation Formulas Cheat Sheet", size: "1.1 MB" },
    ],
    modelPapers: [
      { id: "m1", title: "Term 1 Model Paper - Royal College", size: "3.2 MB" },
      { id: "m2", title: "Zonal Education Office Model Paper", size: "4.1 MB" },
    ],
    pastPapers: [
      { id: "p1", title: "2023 A/L Past Paper", size: "5.6 MB" },
      { id: "p2", title: "2022 A/L Past Paper", size: "4.8 MB" },
    ]
  };

  const gradesData = [
    { id: "1", subject: "Mathematics", type: "Mid-term Exam", grade: "A", gradeColor: "#15803D", gradeBg: "#DCFCE7", icon: "sigma", iconBg: "#E0F2FE", iconColor: "#2563EB", trend: "arrow-trend-up", trendColor: "#22C55E" },
    { id: "2", subject: "Physics", type: "Practical Assessment", grade: "B+", gradeColor: "#4338CA", gradeBg: "#E0E7FF", icon: "flask", iconBg: "#EDE9FE", iconColor: "#7C3AED", trend: "arrow-right", trendColor: "#9CA3AF" },
    { id: "3", subject: "History", type: "Quiz #4", grade: "A-", gradeColor: "#15803D", gradeBg: "#DCFCE7", icon: "book-journal-whills", iconBg: "#FFEDD5", iconColor: "#EA580C", trend: "arrow-trend-up", trendColor: "#22C55E" },
  ];

  const internshipsData = [
    { id: "1", title: "Software Engineering Intern", company: "Dialog Axiata • Colombo", type: "FULL TIME", bg: "#E0F2FE" },
    { id: "2", title: "Junior UI/UX Designer", company: "WSO2 • Remote", type: "PART TIME", bg: "#F8FAFC" },
  ];

  const calendarDays = [
    { day: 28, type: 'prev', status: 'none' }, { day: 29, type: 'prev', status: 'none' }, { day: 30, type: 'prev', status: 'none' },
    { day: 1, type: 'current', status: 'present' }, { day: 2, type: 'current', status: 'present' }, { day: 3, type: 'current', status: 'absent' }, { day: 4, type: 'current', status: 'present' },
    { day: 5, type: 'current', status: 'none' }, { day: 6, type: 'current', status: 'present', selected: true }, { day: 7, type: 'current', status: 'none' }, { day: 8, type: 'current', status: 'present' }, { day: 9, type: 'current', status: 'present' }, { day: 10, type: 'current', status: 'present' }, { day: 11, type: 'current', status: 'none' },
    { day: 12, type: 'current', status: 'present' }, { day: 13, type: 'current', status: 'present' }, { day: 14, type: 'current', status: 'absent' }, { day: 15, type: 'current', status: 'present' }, { day: 16, type: 'current', status: 'present' }, { day: 17, type: 'current', status: 'present' }, { day: 18, type: 'current', status: 'none' },
  ];

  const openSubject = (subject: any) => {
    setSelectedSubject(subject);
    setSubjectModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* ======================================================= */}
      {/* MAIN DASHBOARD SCREEN                                   */}
      {/* ======================================================= */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <TouchableOpacity 
              style={styles.avatarPlaceholder}
              onPress={() => router.push("/student-profile")}
              activeOpacity={0.8}
            >
              <FontAwesome6 name="user" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View>
              <Text style={styles.greeting}>{greeting}, Amal!</Text>
              <Text style={styles.dateText}>{currentDate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
            <Ionicons name="notifications" size={20} color="#2563EB" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.attendanceCard}>
          <Text style={styles.sectionSubtitle}>Attendance Overview</Text>
          <View style={styles.attendanceRow}>
            <View style={styles.attendanceLeft}>
              <Text style={styles.attendancePercentage}>85%</Text>
              <Text style={styles.attendanceStatus}>On Track</Text>
            </View>
            <TouchableOpacity onPress={() => setAttendanceModalVisible(true)}>
              <FontAwesome6 name="calendar-check" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          <Text style={styles.attendanceFooter}>Excellent consistency this month.</Text>
        </View>

        {/* --- ON GOING SUBJECTS SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>On Going Subjects</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subjectsScroll}>
          {ongoingSubjects.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.subjectCard, { backgroundColor: item.bg }]}
              onPress={() => openSubject(item)}
              activeOpacity={0.9}
            >
              <View style={[styles.subjectIconBox, { backgroundColor: item.color + '20' }]}> 
                {item.icon === "sigma" ? (
                  <MaterialCommunityIcons name="sigma" size={28} color={item.color} />
                ) : (
                  <FontAwesome6 name={item.icon} size={22} color={item.color} />
                )}
              </View>
              <Text style={styles.subjectCardTitle} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.subjectCardTeacher}>{item.teacher}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- LATEST GRADES SECTION --- */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Latest Grades</Text>
          <TouchableOpacity onPress={() => router.push("/grades")}>
            <Text style={styles.linkText}>View Report</Text>
          </TouchableOpacity>
        </View>

        {gradesData.map((item) => (
          <View key={item.id} style={styles.gradeCard}>
            <View style={styles.gradeInfoLeft}>
              <View style={[styles.gradeIconContainer, { backgroundColor: item.iconBg }]}>
                {item.icon === "sigma" ? (
                  <MaterialCommunityIcons name="sigma" size={24} color={item.iconColor} />
                ) : (
                  <FontAwesome6 name={item.icon} size={18} color={item.iconColor} />
                )}
              </View>
              <View>
                <Text style={styles.subjectName}>{item.subject}</Text>
                <Text style={styles.assessmentType}>{item.type}</Text>
              </View>
            </View>
            <View style={styles.gradeInfoRight}>
              <View style={[styles.gradeBadge, { backgroundColor: item.gradeBg }]}>
                <Text style={[styles.gradeBadgeText, { color: item.gradeColor }]}>{item.grade}</Text>
              </View>
              <FontAwesome6 name={item.trend} size={14} color={item.trendColor} style={{ marginLeft: 8 }} />
            </View>
          </View>
        ))}

        {/* --- RECOMMENDED INTERNSHIPS SECTION --- */}
        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Recommended Internships</Text>
          <TouchableOpacity onPress={() => router.push("/jobs")}>
            <Text style={styles.linkText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.internshipScroll}>
          {internshipsData.map((item) => (
            <View key={item.id} style={[styles.internshipCard, { backgroundColor: item.bg }]}>
              <View style={styles.internshipTopRow}>
                <View style={styles.companyLogoPlaceholder}>
                  <Text style={styles.companyInitial}>{item.company.charAt(0)}</Text>
                </View>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{item.type}</Text>
                </View>
              </View>
              
              <Text style={styles.internshipTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.internshipCompany} numberOfLines={1}>{item.company}</Text>
              
              <TouchableOpacity style={styles.applyButton} activeOpacity={0.8} onPress={() => router.push("/jobs")}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* ======================================================= */}
      {/* SUBJECT MATERIALS MODAL                                 */}
      {/* ======================================================= */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isSubjectModalVisible}
        onRequestClose={() => setSubjectModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSubjectModalVisible(false)} style={styles.modalBackButton}>
              <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle} numberOfLines={1}>
              {selectedSubject?.name} Materials
            </Text>
            <View style={{ width: 36 }}></View>
          </View>

          <ScrollView contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
            
            <View style={[styles.subjectBanner, { backgroundColor: selectedSubject?.bg || '#EFF6FF' }]}>
               <View style={[styles.bannerIconBox, { backgroundColor: selectedSubject?.color || '#2563EB' }]}>
                  {selectedSubject?.icon === "sigma" ? (
                    <MaterialCommunityIcons name="sigma" size={32} color="#FFFFFF" />
                  ) : (
                    <FontAwesome6 name={selectedSubject?.icon || "book"} size={26} color="#FFFFFF" />
                  )}
               </View>
               <View style={{ flex: 1 }}>
                 <Text style={styles.bannerTitle}>{selectedSubject?.name}</Text>
                 <Text style={styles.bannerTeacher}>Taught by {selectedSubject?.teacher}</Text>
               </View>
            </View>

            <View style={styles.materialSection}>
              <View style={styles.materialSectionHeader}>
                <Feather name="video" size={18} color="#1E293B" />
                <Text style={styles.materialSectionTitle}>Video Lectures</Text>
              </View>
              {subjectMaterials.videos.map(video => (
                <View key={video.id} style={styles.materialItem}>
                  <View style={styles.materialItemIconBox}>
                    <FontAwesome6 name="play" size={14} color="#EF4444" />
                  </View>
                  <View style={styles.materialItemInfo}>
                    <Text style={styles.materialItemTitle} numberOfLines={2}>{video.title}</Text>
                    <Text style={styles.materialItemSub}>{video.duration}</Text>
                  </View>
                  <TouchableOpacity style={styles.actionIconButton}>
                    <FontAwesome6 name="circle-play" size={22} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.materialSection}>
              <View style={styles.materialSectionHeader}>
                <Feather name="file-text" size={18} color="#1E293B" />
                <Text style={styles.materialSectionTitle}>Lecture Notes</Text>
              </View>
              {subjectMaterials.notes.map(note => (
                <View key={note.id} style={styles.materialItem}>
                  <View style={styles.materialItemIconBox}>
                    <FontAwesome6 name="file-pdf" size={16} color="#EF4444" />
                  </View>
                  <View style={styles.materialItemInfo}>
                    <Text style={styles.materialItemTitle} numberOfLines={2}>{note.title}</Text>
                    <Text style={styles.materialItemSub}>PDF • {note.size}</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Feather name="download" size={16} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.materialSection}>
              <View style={styles.materialSectionHeader}>
                <Feather name="edit-3" size={18} color="#1E293B" />
                <Text style={styles.materialSectionTitle}>Model Papers</Text>
              </View>
              {subjectMaterials.modelPapers.map(paper => (
                <View key={paper.id} style={styles.materialItem}>
                  <View style={styles.materialItemIconBox}>
                    <FontAwesome6 name="file-pdf" size={16} color="#EF4444" />
                  </View>
                  <View style={styles.materialItemInfo}>
                    <Text style={styles.materialItemTitle} numberOfLines={2}>{paper.title}</Text>
                    <Text style={styles.materialItemSub}>PDF • {paper.size}</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Feather name="download" size={16} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.materialSection}>
              <View style={styles.materialSectionHeader}>
                <Feather name="clock" size={18} color="#1E293B" />
                <Text style={styles.materialSectionTitle}>Past Papers</Text>
              </View>
              {subjectMaterials.pastPapers.map(paper => (
                <View key={paper.id} style={styles.materialItem}>
                  <View style={styles.materialItemIconBox}>
                    <FontAwesome6 name="file-pdf" size={16} color="#EF4444" />
                  </View>
                  <View style={styles.materialItemInfo}>
                    <Text style={styles.materialItemTitle} numberOfLines={2}>{paper.title}</Text>
                    <Text style={styles.materialItemSub}>PDF • {paper.size}</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Feather name="download" size={16} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

          </ScrollView>
        </View>
      </Modal>

      {/* ======================================================= */}
      {/* ATTENDANCE DETAILS MODAL                                */}
      {/* ======================================================= */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isAttendanceModalVisible}
        onRequestClose={() => setAttendanceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setAttendanceModalVisible(false)} style={styles.modalBackButton}>
              <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Attendance Details</Text>
            <View style={{ width: 36 }}></View>
          </View>

          <ScrollView contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: "#F0F9FF", flex: 1.2 }]}>
                <Text style={styles.statLabel}>Total Attendance</Text>
                <View style={styles.statValueRow}>
                  <Text style={styles.statValue}>85%</Text>
                  <Text style={styles.statTrend}>+2%</Text>
                </View>
              </View>
              <View style={[styles.statCard, { flex: 1 }]}>
                <Text style={styles.statLabel}>Present</Text>
                <Text style={styles.statValue}>170</Text>
              </View>
              <View style={[styles.statCard, { flex: 1 }]}>
                <Text style={styles.statLabel}>Absent</Text>
                <Text style={styles.statValue}>30</Text>
              </View>
            </View>

            <View style={styles.calendarWidget}>
              <View style={styles.calendarHeader}>
                <FontAwesome6 name="chevron-left" size={14} color="#1E293B" />
                <Text style={styles.calendarMonth}>October 2023</Text>
                <FontAwesome6 name="chevron-right" size={14} color="#1E293B" />
              </View>

              <View style={styles.calendarDaysHeader}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <Text key={i} style={styles.calendarDayText}>{day}</Text>
                ))}
              </View>

              <View style={styles.calendarGrid}>
                {calendarDays.map((item, index) => (
                  <View key={index} style={styles.calendarCell}>
                    <View style={[styles.dayNumberCircle, item.selected && styles.dayNumberSelected]}>
                      <Text style={[
                        styles.dayNumberText, 
                        item.type === 'prev' && styles.dayNumberPrev,
                        item.selected && styles.dayNumberTextSelected
                      ]}>
                        {item.day}
                      </Text>
                    </View>
                    {item.status === 'present' && <View style={[styles.statusDot, { backgroundColor: '#16A34A' }]}></View>}
                    {item.status === 'absent' && <View style={[styles.statusDot, { backgroundColor: '#EF4444' }]}></View>}
                  </View>
                ))}
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]}></View>
                  <Text style={styles.legendText}>Present</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]}></View>
                  <Text style={styles.legendText}>Absent</Text>
                </View>
              </View>
            </View>

            <View style={styles.insightsHeader}>
              <FontAwesome6 name="chart-line" size={18} color="#3B82F6" />
              <Text style={styles.insightsTitle}>Monthly Insights</Text>
            </View>

            <View style={styles.insightsCard}>
              <View style={styles.insightsTop}>
                <View>
                  <Text style={styles.insightsSub}>vs. Last Month</Text>
                  <Text style={styles.insightsValue}>Improved by 4.2%</Text>
                </View>
                <MaterialCommunityIcons name="poll" size={40} color="#BFDBFE" />
              </View>
              
              <View style={styles.quoteBox}>
                <Text style={styles.quoteText}>
                  "Great job, Amal! You've been more consistent this month. Keep it up to reach your 90% goal."
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 100 },
  
  /* --- Main Screen Header --- */
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#78909C", justifyContent: "center", alignItems: "center", marginRight: 12 },
  greeting: { fontSize: 20, fontWeight: "bold", color: "#1E293B", marginBottom: 2 },
  dateText: { fontSize: 10, fontWeight: "700", color: "#64748B", letterSpacing: 0.5 },
  notificationBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  notificationDot: { position: "absolute", top: 10, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444", borderWidth: 1.5, borderColor: "#FFFFFF" },

  attendanceCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 30, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  sectionSubtitle: { fontSize: 14, fontWeight: "600", color: "#475569", marginBottom: 8 },
  attendanceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  attendanceLeft: { flexDirection: "row", alignItems: "baseline" },
  attendancePercentage: { fontSize: 36, fontWeight: "900", color: "#2563EB", marginRight: 8 },
  attendanceStatus: { fontSize: 14, fontWeight: "700", color: "#16A34A" },
  attendanceFooter: { fontSize: 12, color: "#94A3B8" },

  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  linkText: { fontSize: 14, fontWeight: "600", color: "#3B82F6" },

  subjectsScroll: { paddingBottom: 10, gap: 16 },
  subjectCard: { width: width * 0.4, borderRadius: 16, padding: 16, marginRight: 16 },
  subjectIconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  subjectCardTitle: { fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  subjectCardTeacher: { fontSize: 12, color: "#64748B" },

  gradeCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 2 },
  gradeInfoLeft: { flexDirection: "row", alignItems: "center" },
  gradeIconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 12 },
  subjectName: { fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 2 },
  assessmentType: { fontSize: 12, color: "#94A3B8" },
  gradeInfoRight: { flexDirection: "row", alignItems: "center", width: 50, justifyContent: "flex-end" },
  gradeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  gradeBadgeText: { fontWeight: "800", fontSize: 14 },

  internshipScroll: { paddingBottom: 20, gap: 16 },
  internshipCard: { width: width * 0.65, borderRadius: 20, padding: 20, marginRight: 16 },
  internshipTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  companyLogoPlaceholder: { width: 40, height: 40, borderRadius: 8, backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center" },
  companyInitial: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  typeBadge: { backgroundColor: "#3B82F6", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  typeBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "bold" },
  internshipTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  internshipCompany: { fontSize: 12, color: "#64748B", marginBottom: 20 },
  applyButton: { backgroundColor: "#2563EB", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  applyButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },

  /* --- SHARED MODAL STYLES --- */
  modalContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  modalScrollContent: { padding: 20, paddingBottom: 60 },
  
  modalHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'ios' ? 50 : 40, 
    paddingBottom: 16, 
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  modalBackButton: { padding: 8, marginLeft: -8, width: 36 },
  modalHeaderTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B", flex: 1, textAlign: "center" },
  
  /* --- SUBJECT MATERIALS MODAL STYLES --- */
  subjectBanner: { flexDirection: "row", alignItems: "center", padding: 20, borderRadius: 16, marginBottom: 24 },
  bannerIconBox: { width: 60, height: 60, borderRadius: 16, justifyContent: "center", alignItems: "center", marginRight: 16 },
  bannerTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  bannerTeacher: { fontSize: 13, color: "#475569" },
  
  materialSection: { marginBottom: 24 },
  materialSectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12, paddingLeft: 4 },
  materialSectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginLeft: 8 },
  materialItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", padding: 16, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: "#F1F5F9", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  materialItemIconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#FEF2F2", justifyContent: "center", alignItems: "center", marginRight: 12 },
  materialItemInfo: { flex: 1, marginRight: 12 },
  materialItemTitle: { fontSize: 14, fontWeight: "600", color: "#1E293B", marginBottom: 4 },
  materialItemSub: { fontSize: 12, color: "#64748B" },
  downloadButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center" },
  actionIconButton: { padding: 4 },

  /* --- ATTENDANCE MODAL STYLES --- */
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  statLabel: { fontSize: 12, fontWeight: "600", color: "#64748B", marginBottom: 8 },
  statValueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  statValue: { fontSize: 24, fontWeight: "900", color: "#1E293B" },
  statTrend: { fontSize: 12, fontWeight: "bold", color: "#16A34A" },
  calendarWidget: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  calendarHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 20 },
  calendarMonth: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  calendarDaysHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  calendarDayText: { width: 30, textAlign: "center", fontSize: 12, fontWeight: "bold", color: "#94A3B8" },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  calendarCell: { width: `${100 / 7}%`, alignItems: "center", marginBottom: 16 },
  dayNumberCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center", marginBottom: 4 },
  dayNumberSelected: { backgroundColor: "#DBEAFE" },
  dayNumberText: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  dayNumberPrev: { color: "#CBD5E1" },
  dayNumberTextSelected: { color: "#2563EB" },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  legendRow: { flexDirection: "row", justifyContent: "center", gap: 24, marginTop: 10, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, fontWeight: "600", color: "#64748B" },
  insightsHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16, marginTop: 10 },
  insightsTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  insightsCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  insightsTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  insightsSub: { fontSize: 12, color: "#64748B", marginBottom: 4 },
  insightsValue: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  quoteBox: { backgroundColor: "#F8FAFC", padding: 16, borderRadius: 12 },
  quoteText: { fontSize: 13, color: "#64748B", fontStyle: "italic", lineHeight: 20 },
});