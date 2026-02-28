import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions // <-- Added missing Dimensions import
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// <-- Defined the width variable for the Resume template cards
const { width } = Dimensions.get("window"); 

export default function StudentProfileScreen() {
  const router = useRouter();
  
  // Navigation & Tab States
  const [activeTab, setActiveTab] = useState("About");
  const tabs = ["About", "Resume"];

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable Form State (About Tab)
  const [mobile, setMobile] = useState("+94 77 123 4567");
  const [homePhone, setHomePhone] = useState("+94 11 234 5678");
  const [address, setAddress] = useState("123, Flower Road, Colombo 07");

  // Mock Data for O/L Results
  const isOLCompleted = true;
  const olResults = [
    { subject: "Buddhism", grade: "A" },
    { subject: "Sinhala Language & Lit.", grade: "A" },
    { subject: "Mathematics", grade: "A" },
    { subject: "Science", grade: "A" },
    { subject: "English", grade: "B" },
    { subject: "History", grade: "A" },
    { subject: "Business & Acct.", grade: "A" },
    { subject: "Geography", grade: "B" },
    { subject: "ICT", grade: "A" },
  ];

  // Mock Resume Templates
  const templates = [
    { id: "1", name: "Modern Student", color: "#3B82F6" },
    { id: "2", name: "Minimalist", color: "#64748B" },
    { id: "3", name: "Creative IT", color: "#8B5CF6" },
  ];

  const handleLogout = () => {
    router.replace("/selection");
  };

  const handleSave = () => {
    console.log("Saving profile updates...");
    setIsEditing(false);
  };

  // Helper for consistent info rows
  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        
        {/* Dynamic Header */}
        <View style={styles.header}>
          {isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.iconButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
            </TouchableOpacity>
          )}

          <Text style={styles.headerTitle}>{isEditing ? "Edit Profile" : "Profile"}</Text>
          
          {isEditing ? (
            <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.iconButton}>
              <Feather name="edit" size={20} color="#1E293B" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* MAIN PROFILE HEADER (Hidden when editing or on other tabs) */}
          {activeTab === "About" && !isEditing && (
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>KW</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>Kasun Wickramasinghe</Text>
                
                <View style={[styles.statsRow, { marginTop: 12 }]}>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>3.6</Text>
                    <Text style={styles.statLabel}>GPA</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>92%</Text>
                    <Text style={styles.statLabel}>Attendance</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Custom Tabs */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab} 
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => {
                  setActiveTab(tab);
                  setIsEditing(false);
                }}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ========================================== */}
          {/* TAB CONTENT: ABOUT (VIEW MODE)             */}
          {/* ========================================== */}
          {activeTab === "About" && !isEditing && (
            <View style={styles.tabContent}>
              
              {/* Academic Details */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Academic Information</Text>
                <InfoRow label="Student ID" value="STU-90214" />
                <InfoRow label="Full Name" value="Kasun Wickramasinghe" />
                <InfoRow label="Email Address" value="kasun.w@school.lk" />
                <InfoRow label="Grade" value="12" />
                <InfoRow label="Stream/Section" value="Physical Science" />
              </View>

              {/* Personal Details */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Personal Information</Text>
                <InfoRow label="NIC" value="200512345678" />
                <InfoRow label="Mobile Number" value={mobile} />
                <InfoRow label="Home Phone" value={homePhone} />
                <InfoRow label="Date of Birth" value="15 May 2005" />
                <InfoRow label="Nationality" value="Sri Lankan" />
                <InfoRow label="Religion" value="Buddhism" />
                <View style={styles.infoRowColumn}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValueMultline}>{address}</Text>
                </View>
                <InfoRow label="District" value="Colombo" />
                <InfoRow label="Province" value="Western Province" />
              </View>

              {/* Guardian Details */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Guardian Information</Text>
                
                {/* Father */}
                <View style={styles.guardianRow}>
                  <Text style={styles.guardianLabel}>Father</Text>
                  <Text style={styles.guardianValue}>Mr. Nimal Wickramasinghe</Text>
                </View>
                <View style={styles.guardianRow}>
                  <Text style={styles.guardianLabel}>Phone</Text>
                  <Text style={styles.guardianValue}>+94 71 987 6543</Text>
                </View>
                <View style={styles.guardianRow}>
                  <Text style={styles.guardianLabel}>Email</Text>
                  <Text style={styles.guardianValue}>nimal.w@email.com</Text>
                </View>
                
                <View style={styles.cardDivider} />

                {/* Mother */}
                <View style={styles.guardianRow}>
                  <Text style={styles.guardianLabel}>Mother</Text>
                  <Text style={styles.guardianValue}>Mrs. Shirani Wickramasinghe</Text>
                </View>
                <View style={styles.guardianRow}>
                  <Text style={styles.guardianLabel}>Phone</Text>
                  <Text style={styles.guardianValue}>+94 77 234 5678</Text>
                </View>
                <View style={styles.guardianRow}>
                  <Text style={styles.guardianLabel}>Email</Text>
                  <Text style={styles.guardianValue}>shirani.w@email.com</Text>
                </View>
              </View>

              {/* Education Details (O/L) */}
              {isOLCompleted && (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>G.C.E O/L Examination</Text>
                  <InfoRow label="School" value="Royal College, Colombo" />
                  <InfoRow label="Year" value="2021" />
                  <InfoRow label="Status" value="Passed" />
                  <InfoRow label="Scheme" value="Local Syllabus" />
                  
                  <View style={styles.cardDivider} />
                  <Text style={[styles.infoLabel, { marginBottom: 12 }]}>Subjects & Results</Text>
                  
                  <View style={styles.resultsGrid}>
                    {olResults.map((item, index) => (
                      <View key={index} style={styles.resultItem}>
                        <Text style={styles.resultSubject} numberOfLines={1}>{item.subject}</Text>
                        <Text style={[styles.resultGrade, { color: item.grade === "A" ? "#16A34A" : item.grade === "B" ? "#2563EB" : "#D97706" }]}>
                          {item.grade}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                <FontAwesome6 name="right-from-bracket" size={16} color="#EF4444" style={{ marginRight: 8 }} />
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ========================================== */}
          {/* TAB CONTENT: ABOUT (EDIT MODE)             */}
          {/* ========================================== */}
          {activeTab === "About" && isEditing && (
            <View style={styles.tabContent}>
              
              {/* Edit Profile Photo */}
              <View style={styles.photoEditContainer}>
                <View style={styles.largeAvatar}>
                  <Text style={styles.largeAvatarText}>KW</Text>
                </View>
                <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8}>
                  <Feather name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.changePhotoText}>Change Profile Photo</Text>
              </View>

              {/* Edit Contact Details */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Home Phone</Text>
                <TextInput
                  style={styles.input}
                  value={homePhone}
                  onChangeText={setHomePhone}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Home Address</Text>
                <TextInput
                  style={styles.textArea}
                  multiline
                  numberOfLines={3}
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor="#9CA3AF"
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.infoBox}>
                <Feather name="info" size={16} color="#3B82F6" style={{ marginRight: 8 }} />
                <Text style={styles.infoBoxText}>
                  To change your locked personal, academic, or guardian information, please contact the school administration directly.
                </Text>
              </View>

            </View>
          )}

          {/* ========================================== */}
          {/* TAB CONTENT: RESUME (VIEW MODE)            */}
          {/* ========================================== */}
          {activeTab === "Resume" && !isEditing && (
            <View style={styles.tabContent}>
              
              {/* Action Buttons Row */}
              <View style={styles.resumeActionRow}>
                <TouchableOpacity style={styles.resumePrimaryBtn} activeOpacity={0.8}>
                  <FontAwesome6 name="file-arrow-down" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.resumePrimaryBtnText}>Download PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resumeSecondaryBtn} activeOpacity={0.8}>
                  <FontAwesome6 name="share-nodes" size={16} color="#2563EB" style={{ marginRight: 8 }} />
                  <Text style={styles.resumeSecondaryBtnText}>Share</Text>
                </TouchableOpacity>
              </View>

              {/* Resume Document Preview */}
              <View style={styles.resumeDocumentCard}>
                <Text style={styles.docHeaderName}>Kasun Wickramasinghe</Text>
                <Text style={styles.docHeaderContact}>kasun.w@school.lk | +94 77 123 4567 | Colombo, LK</Text>
                <View style={styles.docDivider} />

                <Text style={styles.docSectionTitle}>OBJECTIVE</Text>
                <Text style={styles.docText}>
                  A highly motivated Grade 12 Physical Science student with a strong passion for software development and mathematics. Seeking an internship opportunity to apply problem-solving skills and learn in a professional environment.
                </Text>

                <Text style={styles.docSectionTitle}>EDUCATION</Text>
                <Text style={styles.docSubhead}>Royal College, Colombo</Text>
                <Text style={styles.docDateText}>2022 - Present</Text>
                <Text style={styles.docText}>• G.C.E Advanced Level (Physical Science Stream)</Text>
                <Text style={styles.docText}>• Current GPA: 3.6/4.0</Text>

                <Text style={[styles.docSubhead, { marginTop: 8 }]}>G.C.E Ordinary Level</Text>
                <Text style={styles.docDateText}>Completed 2021</Text>
                <Text style={styles.docText}>• Passed with 7 A's and 2 B's, including A's in Mathematics, Science, and ICT.</Text>

                <Text style={styles.docSectionTitle}>EXTRACURRICULAR ACTIVITIES</Text>
                <Text style={styles.docSubhead}>President - School Coding Club</Text>
                <Text style={styles.docDateText}>2023 - Present</Text>
                <Text style={styles.docText}>• Organized the annual inter-school hackathon with over 200 participants.</Text>
                <Text style={styles.docText}>• Conducted weekly Python programming workshops for junior students.</Text>

                <Text style={styles.docSectionTitle}>SKILLS & INTERESTS</Text>
                <Text style={styles.docText}>• <Text style={{fontWeight:'bold'}}>Languages:</Text> Python, HTML/CSS, Basic JavaScript.</Text>
                <Text style={styles.docText}>• <Text style={{fontWeight:'bold'}}>Soft Skills:</Text> Leadership, Team Collaboration, Public Speaking.</Text>
                <Text style={styles.docText}>• <Text style={{fontWeight:'bold'}}>Interests:</Text> Robotics, Chess, Open-source contributions.</Text>

              </View>
            </View>
          )}

          {/* ========================================== */}
          {/* TAB CONTENT: RESUME (EDIT MODE)            */}
          {/* ========================================== */}
          {activeTab === "Resume" && isEditing && (
            <View style={styles.tabContent}>
              
              {/* Section 1: Upload Existing */}
              <View style={styles.sectionHeaderGroup}>
                <FontAwesome6 name="cloud-arrow-up" size={18} color="#1E293B" />
                <Text style={styles.sectionTitle}>Upload Existing Resume</Text>
              </View>
              
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
                <View style={styles.uploadIconContainer}>
                  <MaterialCommunityIcons name="file-document-outline" size={32} color="#3B82F6" />
                </View>
                <Text style={styles.uploadTitle}>Browse files to upload</Text>
                <Text style={styles.uploadSubtitle}>Supports PDF and DOCX (Max 5MB)</Text>
                <View style={styles.browseButton}>
                  <Text style={styles.browseButtonText}>Select File</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.orDividerRow}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orLine} />
              </View>

              {/* Section 2: Create from Template */}
              <View style={styles.sectionHeaderGroup}>
                <FontAwesome6 name="wand-magic-sparkles" size={18} color="#1E293B" />
                <Text style={styles.sectionTitle}>Create with a Template</Text>
              </View>
              <Text style={styles.templateSubtitle}>Choose a design. We'll automatically fill it with your profile data!</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateScroll}>
                {templates.map((template) => (
                  <TouchableOpacity key={template.id} style={styles.templateCard} activeOpacity={0.9}>
                    <View style={styles.templatePreview}>
                      <View style={[styles.tempHeaderBox, { backgroundColor: template.color }]} />
                      <View style={styles.tempLineBlock}>
                        <View style={styles.tempLineLong} />
                        <View style={styles.tempLineShort} />
                      </View>
                      <View style={styles.tempLineBlock}>
                        <View style={styles.tempLineLong} />
                        <View style={styles.tempLineMedium} />
                        <View style={styles.tempLineShort} />
                      </View>
                    </View>
                    <Text style={styles.templateName}>{template.name}</Text>
                    <View style={styles.useTemplateBtn}>
                      <Text style={styles.useTemplateText}>Use Template</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: "#FFFFFF" },
  iconButton: { padding: 8, minWidth: 60, alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  cancelText: { fontSize: 16, color: "#64748B" },
  saveText: { fontSize: 16, fontWeight: "bold", color: "#2563EB" },
  scrollContent: { paddingBottom: 40 },

  /* Profile Header */
  profileHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },
  avatar: { width: 80, height: 80, borderRadius: 16, backgroundColor: "#3B82F6", justifyContent: "center", alignItems: "center", marginRight: 16 },
  avatarText: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  profileInfo: { flex: 1 },
  name: { fontSize: 20, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  statsRow: { flexDirection: "row", alignItems: "center" },
  statBox: { alignItems: "flex-start" },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  statLabel: { fontSize: 11, color: "#64748B", marginTop: 2 },
  statDivider: { width: 1, height: 24, backgroundColor: "#E2E8F0", marginHorizontal: 20 },

  /* Tabs */
  tabsContainer: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E2E8F0", paddingHorizontal: 10, backgroundColor: "#FFFFFF" },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  activeTab: { borderBottomColor: "#2563EB" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  activeTabText: { color: "#2563EB" },
  tabContent: { padding: 20 },
  
  /* About Cards */
  card: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#F1F5F9", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginBottom: 16 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  infoLabel: { fontSize: 13, color: "#64748B", flex: 1 },
  infoValue: { fontSize: 13, color: "#1E293B", fontWeight: "500", flex: 1.5, textAlign: "right" },
  infoRowColumn: { marginBottom: 12 },
  infoValueMultline: { fontSize: 13, color: "#1E293B", fontWeight: "500", marginTop: 4, lineHeight: 20 },
  cardDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
  resultsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  resultItem: { width: "48%", backgroundColor: "#F8FAFC", padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#F1F5F9" },
  resultSubject: { fontSize: 12, color: "#475569", flex: 1, marginRight: 8 },
  resultGrade: { fontSize: 14, fontWeight: "bold" },
  guardianRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  guardianLabel: { fontSize: 13, color: "#64748B", flex: 1 },
  guardianValue: { fontSize: 13, color: "#1E293B", fontWeight: "500", flex: 2, textAlign: "right" },

  /* About Edit Mode */
  photoEditContainer: { alignItems: "center", marginBottom: 30, marginTop: 10 },
  largeAvatar: { width: 100, height: 100, borderRadius: 20, backgroundColor: "#3B82F6", justifyContent: "center", alignItems: "center" },
  largeAvatarText: { fontSize: 36, fontWeight: "bold", color: "#FFFFFF" },
  cameraBadge: { position: "absolute", bottom: 25, right: "35%", backgroundColor: "#1E293B", width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#F8FAFC" },
  changePhotoText: { marginTop: 12, fontSize: 14, fontWeight: "600", color: "#2563EB" },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "bold", color: "#1E293B", marginBottom: 8 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 16, fontSize: 14, color: "#1E293B" },
  textArea: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 16, fontSize: 14, color: "#1E293B", minHeight: 80 },
  infoBox: { flexDirection: "row", backgroundColor: "#EFF6FF", padding: 16, borderRadius: 12, marginTop: 10 },
  infoBoxText: { flex: 1, fontSize: 13, color: "#1E40AF", lineHeight: 20 },
  logoutButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: "#FECACA", backgroundColor: "#FEF2F2" },
  logoutButtonText: { color: "#EF4444", fontSize: 15, fontWeight: "bold" },

  /* Resume View Mode */
  resumeActionRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  resumePrimaryBtn: { flex: 1, flexDirection: "row", backgroundColor: "#2563EB", paddingVertical: 14, borderRadius: 12, justifyContent: "center", alignItems: "center", shadowColor: "#2563EB", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  resumePrimaryBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  resumeSecondaryBtn: { flex: 1, flexDirection: "row", backgroundColor: "#EFF6FF", paddingVertical: 14, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#BFDBFE" },
  resumeSecondaryBtnText: { color: "#2563EB", fontSize: 14, fontWeight: "bold" },
  
  resumeDocumentCard: { backgroundColor: "#FFFFFF", borderRadius: 8, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, minHeight: 400 },
  docHeaderName: { fontSize: 22, fontWeight: "900", color: "#0F172A", textAlign: "center", marginBottom: 4, textTransform: "uppercase" },
  docHeaderContact: { fontSize: 11, color: "#475569", textAlign: "center", marginBottom: 16 },
  docDivider: { height: 2, backgroundColor: "#1E293B", marginBottom: 16 },
  docSectionTitle: { fontSize: 12, fontWeight: "bold", color: "#1E293B", marginBottom: 8, marginTop: 16, letterSpacing: 1 },
  docSubhead: { fontSize: 13, fontWeight: "bold", color: "#334155" },
  docDateText: { fontSize: 11, color: "#64748B", marginBottom: 6, fontStyle: "italic" },
  docText: { fontSize: 12, color: "#334155", lineHeight: 20, marginBottom: 4 },

  /* Resume Edit Mode */
  sectionHeaderGroup: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginLeft: 8 },
  
  uploadBox: { backgroundColor: "#F8FAFC", borderWidth: 2, borderColor: "#CBD5E1", borderStyle: "dashed", borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 24 },
  uploadIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  uploadTitle: { fontSize: 16, fontWeight: "600", color: "#1E293B", marginBottom: 4 },
  uploadSubtitle: { fontSize: 13, color: "#64748B", marginBottom: 16 },
  browseButton: { backgroundColor: "#1E293B", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  browseButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },

  orDividerRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  orLine: { flex: 1, height: 1, backgroundColor: "#E2E8F0" },
  orText: { marginHorizontal: 16, fontSize: 12, fontWeight: "bold", color: "#94A3B8" },

  templateSubtitle: { fontSize: 13, color: "#64748B", marginBottom: 16, lineHeight: 20 },
  templateScroll: { paddingBottom: 20, gap: 16 },
  templateCard: { width: width * 0.4, backgroundColor: "#FFFFFF", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#E2E8F0", marginRight: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  templatePreview: { height: 140, backgroundColor: "#F8FAFC", borderRadius: 8, marginBottom: 12, padding: 8, borderWidth: 1, borderColor: "#F1F5F9" },
  tempHeaderBox: { height: 20, borderRadius: 4, marginBottom: 12 },
  tempLineBlock: { marginBottom: 12 },
  tempLineLong: { height: 6, backgroundColor: "#CBD5E1", borderRadius: 3, marginBottom: 6, width: "100%" },
  tempLineMedium: { height: 6, backgroundColor: "#E2E8F0", borderRadius: 3, marginBottom: 6, width: "70%" },
  tempLineShort: { height: 6, backgroundColor: "#E2E8F0", borderRadius: 3, width: "40%" },
  templateName: { fontSize: 14, fontWeight: "bold", color: "#1E293B", textAlign: "center", marginBottom: 8 },
  useTemplateBtn: { backgroundColor: "#EFF6FF", paddingVertical: 8, borderRadius: 6, alignItems: "center" },
  useTemplateText: { color: "#2563EB", fontSize: 12, fontWeight: "bold" },
});