import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function GradesScreen() {
  const router = useRouter();

  // --- REPORT STATES ---
  const [activeLevel, setActiveLevel] = useState<"OL" | "AL">("OL");
  const [activeTerm, setActiveTerm] = useState("Term 3");

  // --- REPORT MOCK DATA ---
  const olResults = [
    { subject: "Buddhism", marks: 85, grade: "A" },
    { subject: "Sinhala Language & Lit.", marks: 78, grade: "A" },
    { subject: "Mathematics", marks: 92, grade: "A" },
    { subject: "Science", marks: 88, grade: "A" },
    { subject: "English", marks: 75, grade: "B" },
    { subject: "History", marks: 80, grade: "A" },
    { subject: "Business & Acct.", marks: 82, grade: "A" },
    { subject: "Geography", marks: 70, grade: "B" },
    { subject: "ICT", marks: 95, grade: "A" },
  ];

  const alResults = [
    { subject: "Combined Mathematics", marks: 76, grade: "B" },
    { subject: "Physics", marks: 82, grade: "A" },
    { subject: "Chemistry", marks: 70, grade: "B" },
    { subject: "General English", marks: 65, grade: "C" },
    { subject: "Common General Test", marks: 58, grade: "C" },
  ];

  const currentResults = activeLevel === "OL" ? olResults : alResults;
  const totalMarks = currentResults.reduce((sum, item) => sum + item.marks, 0);
  const maxMarks = currentResults.length * 100;
  const average = (totalMarks / currentResults.length).toFixed(1);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "#16A34A";
      case "B": return "#2563EB";
      case "C": return "#D97706";
      case "S": return "#475569";
      default: return "#EF4444";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Report</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Level Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, activeLevel === "OL" && styles.toggleBtnActive]}
            onPress={() => setActiveLevel("OL")}
            activeOpacity={0.8}
          >
            <Text style={[styles.toggleText, activeLevel === "OL" && styles.toggleTextActive]}>O/L (Grade 11)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, activeLevel === "AL" && styles.toggleBtnActive]}
            onPress={() => setActiveLevel("AL")}
            activeOpacity={0.8}
          >
            <Text style={[styles.toggleText, activeLevel === "AL" && styles.toggleTextActive]}>A/L (Grade 13)</Text>
          </TouchableOpacity>
        </View>

        {/* Student Info Card */}
        <View style={styles.studentCard}>
          <View style={styles.studentInfoRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.studentName}>Amal Perera</Text>
              <Text style={styles.studentDetail}>
                {activeLevel === "OL" ? "Grade 11-B" : "Grade 13-M2 (Physical Science)"} • Index: 90214
              </Text>
            </View>
          </View>
        </View>

        {/* Term Selector */}
        <View style={styles.termSelector}>
          {["Term 1", "Term 2", "Term 3"].map((term) => (
            <TouchableOpacity 
              key={term}
              style={[styles.termChip, activeTerm === term && styles.termChipActive]}
              onPress={() => setActiveTerm(term)}
            >
              <Text style={[styles.termText, activeTerm === term && styles.termTextActive]}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Results Table */}
        <View style={styles.resultsContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>Subject</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>Marks</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>Grade</Text>
          </View>

          {currentResults.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCellSubject, { flex: 3 }]}>{item.subject}</Text>
              <Text style={[styles.tableCellMarks, { flex: 1, textAlign: "center" }]}>{item.marks}</Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.tableCellGrade, { color: getGradeColor(item.grade) }]}>
                  {item.grade}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Performance Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Term Performance</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>{totalMarks}<Text style={styles.summarySubValue}>/{maxMarks}</Text></Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Average</Text>
              <Text style={styles.summaryValue}>{average}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Class Rank</Text>
              <Text style={styles.summaryValue}>4<Text style={styles.summarySubValue}>/40</Text></Text>
            </View>
          </View>
        </View>

        {/* Remarks Section */}
        <View style={styles.remarksCard}>
          <View style={styles.remarkHeader}>
            <MaterialCommunityIcons name="comment-quote" size={20} color="#64748B" />
            <Text style={styles.remarkTitle}>Class Teacher's Remark</Text>
          </View>
          <Text style={styles.remarkText}>
            "Amal has shown excellent progress this term, especially in {activeLevel === "OL" ? "Mathematics and Science" : "Physics"}. Keep up the dedication for the final examinations!"
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 10 : 20, paddingBottom: 16, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  backButton: { padding: 8, marginLeft: -8, width: 36 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B", flex: 1, textAlign: "center" },
  scrollContent: { padding: 20, paddingBottom: 60 },
  
  toggleContainer: { flexDirection: "row", backgroundColor: "#E2E8F0", borderRadius: 12, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  toggleBtnActive: { backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  toggleText: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  toggleTextActive: { color: "#2563EB" },
  
  studentCard: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 16, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  studentInfoRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#BFDBFE", justifyContent: "center", alignItems: "center", marginRight: 16 },
  avatarText: { fontSize: 20, fontWeight: "bold", color: "#2563EB" },
  studentName: { fontSize: 18, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  studentDetail: { fontSize: 13, color: "#64748B" },
  
  termSelector: { flexDirection: "row", gap: 10, marginBottom: 20 },
  termChip: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: "#FFFFFF", alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0" },
  termChipActive: { backgroundColor: "#EFF6FF", borderColor: "#2563EB" },
  termText: { fontSize: 13, fontWeight: "600", color: "#64748B" },
  termTextActive: { color: "#2563EB" },
  
  resultsContainer: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E2E8F0", paddingBottom: 12, marginBottom: 8 },
  tableHeaderText: { fontSize: 12, fontWeight: "bold", color: "#94A3B8", textTransform: "uppercase" },
  tableRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  tableCellSubject: { fontSize: 14, fontWeight: "600", color: "#334155" },
  tableCellMarks: { fontSize: 15, fontWeight: "bold", color: "#1E293B" },
  tableCellGrade: { fontSize: 16, fontWeight: "900" },
  
  summaryCard: { backgroundColor: "#2563EB", borderRadius: 16, padding: 20, marginBottom: 20 },
  summaryTitle: { color: "#BFDBFE", fontSize: 14, fontWeight: "600", marginBottom: 16, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 },
  summaryGrid: { flexDirection: "row", justifyContent: "space-between" },
  summaryBox: { alignItems: "center", flex: 1 },
  summaryLabel: { color: "#E0F2FE", fontSize: 12, marginBottom: 4 },
  summaryValue: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  summarySubValue: { fontSize: 14, color: "#93C5FD", fontWeight: "normal" },
  
  remarksCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#E2E8F0", borderStyle: "dashed" },
  remarkHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  remarkTitle: { fontSize: 14, fontWeight: "bold", color: "#475569", marginLeft: 8 },
  remarkText: { fontSize: 14, color: "#64748B", fontStyle: "italic", lineHeight: 22 },
});