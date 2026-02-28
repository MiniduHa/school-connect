import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="calendar-days" size={60} color="#2563EB" style={styles.icon} />
      <Text style={styles.title}>School Calendar</Text>
      <Text style={styles.subtitle}>Your upcoming events, exams, and deadlines will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", padding: 24 },
  icon: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1E293B", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#64748B", textAlign: "center" }
});