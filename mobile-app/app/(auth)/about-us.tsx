import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Linking,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

const { width } = Dimensions.get("window");

// --- S. THOMAS' COLLEGE DATA ---
const schoolDetails = {
  name: "S. Thomas' College",
  tagline: "Esto Perpetua", // The school's famous motto
  description: "Founded in 1851, S. Thomas' College is a prestigious educational institution with a rich Anglican heritage. We are dedicated to producing well-rounded gentlemen by fostering academic excellence, exceptional sportsmanship, and strong moral character.",
  contact: {
    phone: "+94 11 271 2270",
    email: "warden@stc.lk",
    website: "www.stcmount.com",
    address: "Hotel Road, Mount Lavinia, Sri Lanka"
  },
  social: [
    { icon: "facebook", color: "#1877F2", link: "https://facebook.com/stcmount" },
    { icon: "twitter", color: "#1DA1F2", link: "https://twitter.com/stcmount" },
    { icon: "instagram", color: "#E4405F", link: "https://instagram.com/stcmount" },
    { icon: "linkedin", color: "#0A66C2", link: "https://linkedin.com/school/s-thomas-college" }
  ]
};

export default function AboutUsScreen() {
  const router = useRouter();

  const handlePress = (type: string, value: string) => {
    let url = "";
    switch(type) {
      case "phone": url = `tel:${value}`; break;
      case "email": url = `mailto:${value}`; break;
      case "web": url = `https://${value}`; break;
      case "map": url = `http://googleusercontent.com/maps.google.com/?q=${value}`; break;
      default: url = value;
    }
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Hide the default Expo Router header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* CUSTOM HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About School</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* CENTERED LOGO & TITLE SECTION */}
        <View style={styles.logoSection}>
          <Image 
            // MAKE SURE THIS FILE EXISTS IN YOUR ASSETS FOLDER
            source={require('../../assets/stc_logo.jpg')} 
            style={styles.schoolLogo} 
            resizeMode="contain"
          />
          <Text style={styles.schoolName}>{schoolDetails.name}</Text>
          <Text style={styles.schoolTagline}>{schoolDetails.tagline}</Text>
        </View>

        {/* INFORMATION CARDS */}
        <View style={styles.infoSection}>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Our Mission</Text>
            <Text style={styles.descriptionText}>{schoolDetails.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            
            <TouchableOpacity style={styles.contactRow} onPress={() => handlePress('phone', schoolDetails.contact.phone)} activeOpacity={0.7}>
              <View style={[styles.iconBg, { backgroundColor: '#DBEAFE' }]}>
                <Feather name="phone-call" size={18} color="#2563EB" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Phone Number</Text>
                <Text style={styles.contactValue}>{schoolDetails.contact.phone}</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.divider} />

            <TouchableOpacity style={styles.contactRow} onPress={() => handlePress('email', schoolDetails.contact.email)} activeOpacity={0.7}>
              <View style={[styles.iconBg, { backgroundColor: '#FEF3C7' }]}>
                <Feather name="mail" size={18} color="#D97706" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Email Address</Text>
                <Text style={styles.contactValue}>{schoolDetails.contact.email}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.contactRow} onPress={() => handlePress('web', schoolDetails.contact.website)} activeOpacity={0.7}>
              <View style={[styles.iconBg, { backgroundColor: '#D1FAE5' }]}>
                <Feather name="globe" size={18} color="#059669" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactValue}>{schoolDetails.contact.website}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.contactRow} onPress={() => handlePress('map', schoolDetails.contact.address)} activeOpacity={0.7}>
              <View style={[styles.iconBg, { backgroundColor: '#FCE7F3' }]}>
                <Feather name="map-pin" size={18} color="#E11D48" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue} numberOfLines={2}>{schoolDetails.contact.address}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* SOCIAL MEDIA BUTTONS */}
          <View style={styles.socialContainer}>
            {schoolDetails.social.map((social, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.socialBtn, { backgroundColor: social.color + '15' }]} 
                onPress={() => handlePress('link', social.link)}
              >
                <FontAwesome6 name={social.icon as any} size={22} color={social.color} />
              </TouchableOpacity>
            ))}
          </View>

          {/* FOOTER */}
          <Text style={styles.footerText}>School Connect App v1.0.0</Text>
          <Text style={styles.footerSubText}>© 2026 Windows Companies. All rights reserved.</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 15, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  backBtn: { padding: 8, backgroundColor: "#F1F5F9", borderRadius: 12 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  headerSpacer: { width: 36 },
  
  scrollContent: { paddingBottom: 40 },
  
  /* LOGO STYLES */
  logoSection: { alignItems: "center", paddingTop: 30, paddingHorizontal: 24 },
  schoolLogo: { width: 110, height: 110, marginBottom: 16 },
  schoolName: { fontSize: 26, fontWeight: "bold", color: "#1E293B", textAlign: "center" },
  schoolTagline: { fontSize: 14, color: "#64748B", marginTop: 4, fontWeight: "500", textAlign: "center", fontStyle: "italic" },
  
  infoSection: { paddingHorizontal: 24, paddingTop: 25 },
  
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: "#F1F5F9" },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginBottom: 15 },
  descriptionText: { fontSize: 14, color: "#475569", lineHeight: 22 },
  
  contactRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  iconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 15 },
  contactTextContainer: { flex: 1 },
  contactLabel: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  contactValue: { fontSize: 14, fontWeight: "600", color: "#1E293B", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 10 },
  
  socialContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 20, gap: 15 },
  socialBtn: { width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" },
  
  footerText: { textAlign: "center", fontSize: 13, fontWeight: "bold", color: "#9CA3AF", marginTop: 10 },
  footerSubText: { textAlign: "center", fontSize: 11, color: "#CBD5E1", marginTop: 4 },
});