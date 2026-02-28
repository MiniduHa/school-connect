import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function LoadingScreen() {
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.replace("/selection"); 
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Centered Logo & Text */}
      <View style={styles.centerContent}>
        <FontAwesome6 name="graduation-cap" size={90} color="#2B8CEE" style={{ marginBottom: 20 }} />
        <Text style={styles.appName}>School Connect</Text>
        <Text style={styles.subHeading}>Empowering education through collaboration</Text>
      </View>

      {/* Loading Bar */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingHeader}>
          <Text style={styles.initializingText}>INITIALIZING</Text>
          <Text style={styles.percentageText}>{progress}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  centerContent: { alignItems: "center" },
  appName: { fontSize: 26, fontWeight: "700", color: "#2B8CEE", textAlign: "center" },
  subHeading: { fontSize: 14, color: "#64748B", textAlign: "center", marginTop: 8, maxWidth: 260 },
  loadingContainer: { position: "absolute", bottom: 80, width: width - 48 },
  loadingHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  initializingText: { fontSize: 12, color: "#94A3B8", fontWeight: "600" },
  percentageText: { fontSize: 12, color: "#2B8CEE", fontWeight: "600" },
  progressBarBackground: { height: 8, width: "100%", backgroundColor: "#E2E8F0", borderRadius: 8, overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: "#2B8CEE" },
});
