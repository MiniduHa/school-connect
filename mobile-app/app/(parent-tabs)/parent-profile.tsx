import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Switch,
  Linking,
  BackHandler
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

export default function ParentProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // --- DYNAMIC DATA ---
  const initialName = (params.full_name as string) || "Parent User";
  const initialEmail = (params.email as string) || "parent@schoolconnect.com";
  const initialPhone = (params.phone_number as string) || "+94 77 123 4567";
  const child_ids = params.child_ids as string;
  const profile_photo_url = params.profile_photo_url as string;

  // --- STATE MANAGEMENT ---
  const [isEditing, setIsEditing] = useState(false);
  
  // Display States
  const [displayName, setDisplayName] = useState(initialName);
  const [displayEmail, setDisplayEmail] = useState(initialEmail);
  const [displayPhone, setDisplayPhone] = useState(initialPhone);
  const [childrenList, setChildrenList] = useState<string[]>([]);
  const [currentPhotoUri, setCurrentPhotoUri] = useState<string | null>(null);

  // Edit States
  const [editName, setEditName] = useState(initialName);
  const [editEmail, setEditEmail] = useState(initialEmail);
  const [editPhone, setEditPhone] = useState(initialPhone);
  const [editChildrenList, setEditChildrenList] = useState<string[]>([]);
  const [newChildId, setNewChildId] = useState(""); 
  const [originalPhotoUri, setOriginalPhotoUri] = useState<string | null>(null); 
  
  // Preferences
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  useEffect(() => {
    if (profile_photo_url && profile_photo_url !== "null") {
      setCurrentPhotoUri(profile_photo_url);
      setOriginalPhotoUri(profile_photo_url);
    }
    if (child_ids) {
      try {
        const parsed = JSON.parse(child_ids);
        setChildrenList(parsed);
        setEditChildrenList(parsed);
      } catch (error) {
        console.error("Failed to parse child IDs");
      }
    }
  }, [child_ids, profile_photo_url]);

  // --- NAVIGATION: Pass new data back to Home! ---
  const handleGoBack = () => {
    router.navigate({
      pathname: "/(parent-tabs)/parent-screen",
      params: { 
        full_name: displayName, 
        email: displayEmail,
        phone_number: displayPhone,
        child_ids: JSON.stringify(childrenList), 
        profile_photo_url: currentPhotoUri || "null" 
      }
    });
  };

  // --- HARDWARE BACK BUTTON INTERCEPTION ---
  useEffect(() => {
    const onBackPress = () => {
      if (isEditing) {
        setIsEditing(false);
        setCurrentPhotoUri(originalPhotoUri);
      } else {
        handleGoBack(); // Uses the function above to ensure params are sent
      }
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [isEditing, originalPhotoUri, displayName, displayEmail, displayPhone, childrenList, currentPhotoUri]);


  // --- ACTIONS ---
  const handleEditToggle = () => {
    setEditName(displayName);
    setEditEmail(displayEmail);
    setEditPhone(displayPhone);
    setEditChildrenList([...childrenList]);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setCurrentPhotoUri(originalPhotoUri);
    setIsEditing(false);
  };

  const handleSave = () => {
    // 100% Frontend Only - Update local states
    setDisplayName(editName);
    setDisplayEmail(editEmail);
    setDisplayPhone(editPhone);
    setChildrenList([...editChildrenList]);
    setOriginalPhotoUri(currentPhotoUri);
    
    setIsEditing(false);
    
    // Once they hit OK, we navigate back to Home and hand it the new data!
    Alert.alert("Success", "Profile updated locally!", [
      { text: "OK", onPress: handleGoBack }
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => router.replace("/selection") }
    ]);
  };

  const handleRemoveChild = (idToRemove: string) => {
    Alert.alert("Remove Child", `Are you sure you want to unlink Student ID: ${idToRemove}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setEditChildrenList(editChildrenList.filter(id => id !== idToRemove)) }
    ]);
  };

  const handleAddChild = () => {
    if (newChildId.trim() === "") return Alert.alert("Error", "Please enter a valid Student ID.");
    if (editChildrenList.includes(newChildId.trim())) return Alert.alert("Notice", "This Student ID is already linked.");
    setEditChildrenList([...editChildrenList, newChildId.trim()]);
    setNewChildId(""); 
  };

  const handlePickImage = () => {
    Alert.alert("Profile Photo", "Choose an option", [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: openGallery },
        { text: "Remove Photo", onPress: () => setCurrentPhotoUri(null), style: "destructive" },
        { text: "Cancel", style: "cancel" }
    ]);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert("Permission Denied", "Enable camera access in settings.", [{ text: "Cancel", style: "cancel" }, { text: "Settings", onPress: () => Linking.openSettings() }]);
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) setCurrentPhotoUri(result.assets[0].uri);
  };

  const openGallery = async () => {
    const { status, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      if (canAskAgain) {
        const newPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newPermission.status !== 'granted') return; 
      } else {
        return Alert.alert("Permission Required", "Enable gallery access in settings.", [{ text: "Cancel", style: "cancel" }, { text: "Settings", onPress: () => Linking.openSettings() }]);
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) setCurrentPhotoUri(result.assets[0].uri);
  };

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* DISABLE iOS SWIPE GESTURE WHEN EDITING */}
      <Stack.Screen options={{ headerShown: false, gestureEnabled: !isEditing }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        
        {/* DYNAMIC HEADER */}
        <View style={styles.header}>
          {isEditing ? (
            <TouchableOpacity onPress={handleCancel} style={styles.iconButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
              <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
            </TouchableOpacity>
          )}
          
          <Text style={styles.headerTitle}>{isEditing ? "Edit Profile" : "Profile"}</Text>
          
          {isEditing ? (
            <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleEditToggle} style={styles.iconButton}>
              <Feather name="edit" size={20} color="#1E293B" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* =========================================
              VIEW MODE
             ========================================= */}
          {!isEditing && (
            <View style={styles.tabContent}>
              
              <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                  {currentPhotoUri ? (
                    <Image source={{ uri: currentPhotoUri }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.placeholderAvatar}>
                      <FontAwesome6 name="circle-user" size={64} color="#2563EB" />
                    </View>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.name}>{displayName}</Text>
                  <Text style={styles.roleText}>Parent Account</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Account Details</Text>
                <InfoRow label="Full Name" value={displayName} />
                <View style={styles.cardDivider} />
                <InfoRow label="Mobile Number" value={displayPhone} />
                <View style={styles.cardDivider} />
                <InfoRow label="Email Address" value={displayEmail} />
                <View style={styles.cardDivider} />
                <InfoRow label="Password" value="••••••••" />
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Linked Children</Text>
                {childrenList.length > 0 ? (
                  childrenList.map((id, index) => (
                    <View key={index} style={styles.childRowView}>
                      <View style={styles.childAvatarBg}>
                        <FontAwesome6 name="child" size={16} color="#059669" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.childNameView}>Student {index + 1}</Text>
                        <Text style={styles.childIdView}>ID: {id}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No children linked.</Text>
                )}
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Preferences</Text>
                <InfoRow label="Push Notifications" value={pushNotifications ? "Enabled" : "Disabled"} />
                <View style={styles.cardDivider} />
                <InfoRow label="Email Alerts" value={emailAlerts ? "Enabled" : "Disabled"} />
              </View>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                <FontAwesome6 name="right-from-bracket" size={16} color="#EF4444" style={{ marginRight: 8 }} />
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* =========================================
              EDIT MODE
             ========================================= */}
          {isEditing && (
            <View style={styles.tabContent}>
              
              {/* Photo Editor */}
              <View style={styles.photoEditContainer}>
                <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
                  <View style={styles.largeAvatar}>
                    {currentPhotoUri ? (
                      <Image source={{ uri: currentPhotoUri }} style={styles.largeAvatarImage} />
                    ) : (
                      <View style={styles.placeholderAvatarLarge}>
                        <FontAwesome6 name="circle-user" size={80} color="#2563EB" />
                      </View>
                    )}
                  </View>
                  <View style={styles.cameraBadge}>
                    <Feather name="camera" size={16} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
                <Text style={styles.changePhotoText} onPress={handlePickImage}>Change Profile Photo</Text>
              </View>

              {/* Edit Inputs */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                  style={styles.input} 
                  value={editName} 
                  onChangeText={setEditName} 
                  placeholder="Enter full name"
                  placeholderTextColor="#9CA3AF" 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput 
                  style={styles.input} 
                  value={editPhone} 
                  onChangeText={setEditPhone} 
                  keyboardType="phone-pad" 
                  placeholder="Enter mobile number"
                  placeholderTextColor="#9CA3AF" 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput 
                  style={styles.input} 
                  value={editEmail} 
                  onChangeText={setEditEmail} 
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter email address"
                  placeholderTextColor="#9CA3AF" 
                />
              </View>

              {/* Manage Children Edit Section */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Manage Linked Children</Text>
                
                {editChildrenList.length > 0 ? (
                  editChildrenList.map((id, index) => (
                    <View key={index} style={styles.editChildRow}>
                      <View style={styles.childAvatarBg}>
                        <FontAwesome6 name="child" size={14} color="#059669" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.childNameView}>Linked Student</Text>
                        <Text style={styles.childIdView}>ID: {id}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleRemoveChild(id)} style={styles.removeBtn}>
                        <Feather name="trash-2" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.emptyText, { marginBottom: 15 }]}>No children linked yet.</Text>
                )}

                <View style={styles.cardDivider} />

                <Text style={[styles.label, { fontSize: 12, marginTop: 5 }]}>Link New Student</Text>
                <View style={styles.addChildContainer}>
                  <TextInput 
                    style={styles.addChildInput} 
                    value={newChildId} 
                    onChangeText={setNewChildId} 
                    placeholder="Enter Student ID (e.g. ST003)"
                    placeholderTextColor="#9CA3AF" 
                  />
                  <TouchableOpacity style={styles.addChildBtn} onPress={handleAddChild}>
                    <Text style={styles.addChildBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* App Permissions Section */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>App Permissions</Text>
                <View style={styles.switchRow}>
                  <View>
                    <Text style={styles.infoLabel}>Photo Gallery Access</Text>
                    <Text style={styles.helperText}>Used for profile & chat photos</Text>
                  </View>
                  <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.manageBtn}>
                    <Text style={styles.manageBtnText}>Manage</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardDivider} />
                <View style={styles.switchRow}>
                  <View>
                    <Text style={styles.infoLabel}>Camera Access</Text>
                    <Text style={styles.helperText}>Used for taking live photos</Text>
                  </View>
                  <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.manageBtn}>
                    <Text style={styles.manageBtnText}>Manage</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Notification Settings</Text>
                <View style={styles.switchRow}>
                  <View>
                    <Text style={styles.infoLabel}>Push Notifications</Text>
                    <Text style={styles.helperText}>Receive instant alerts</Text>
                  </View>
                  <Switch 
                    value={pushNotifications} 
                    onValueChange={setPushNotifications}
                    trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
                    thumbColor={pushNotifications ? "#2563EB" : "#9CA3AF"}
                  />
                </View>
                <View style={styles.cardDivider} />
                <View style={styles.switchRow}>
                  <View>
                    <Text style={styles.infoLabel}>Email Alerts</Text>
                    <Text style={styles.helperText}>Receive daily summaries</Text>
                  </View>
                  <Switch 
                    value={emailAlerts} 
                    onValueChange={setEmailAlerts}
                    trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
                    thumbColor={emailAlerts ? "#2563EB" : "#9CA3AF"}
                  />
                </View>
              </View>

            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  iconButton: { padding: 8, minWidth: 60, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  cancelText: { fontSize: 16, color: "#64748B" },
  saveText: { fontSize: 16, fontWeight: "bold", color: "#2563EB" },
  scrollContent: { paddingBottom: 40 },
  tabContent: { padding: 20 },
  profileHeader: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 16, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  avatarImage: { width: "100%", height: "100%", borderRadius: 40 },
  placeholderAvatar: { width: "100%", height: "100%", borderRadius: 40, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#FFFFFF" },
  profileInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: "bold", color: "#1E293B" },
  roleText: { fontSize: 14, color: "#64748B", marginTop: 4, fontWeight: "500" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#F1F5F9", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginBottom: 16 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 4 },
  infoLabel: { fontSize: 14, color: "#1E293B", flex: 1, fontWeight: "500" },
  infoValue: { fontSize: 14, color: "#64748B", flex: 1.5, textAlign: "right" },
  cardDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 4 },
  helperText: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  manageBtn: { backgroundColor: "#EFF6FF", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  manageBtnText: { color: "#2563EB", fontSize: 13, fontWeight: "600" },
  childRowView: { flexDirection: "row", alignItems: "center", paddingVertical: 8, backgroundColor: "#F8FAFC", paddingHorizontal: 12, borderRadius: 12, marginBottom: 8 },
  childAvatarBg: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#D1FAE5", justifyContent: "center", alignItems: "center", marginRight: 12 },
  childNameView: { fontSize: 15, fontWeight: "bold", color: "#1E293B" },
  childIdView: { fontSize: 12, color: "#64748B", marginTop: 2 },
  emptyText: { color: "#64748B", fontSize: 14, fontStyle: "italic", textAlign: "center", paddingVertical: 10 },
  editChildRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  removeBtn: { padding: 8, backgroundColor: "#FEF2F2", borderRadius: 8 },
  addChildContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  addChildInput: { flex: 1, backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 10, padding: 12, fontSize: 14, color: "#1E293B", marginRight: 10 },
  addChildBtn: { backgroundColor: "#2563EB", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  addChildBtnText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
  photoEditContainer: { alignItems: "center", marginBottom: 30, marginTop: 10 },
  largeAvatar: { width: 110, height: 110, borderRadius: 55, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
  largeAvatarImage: { width: "100%", height: "100%", borderRadius: 55, borderWidth: 3, borderColor: "#FFFFFF" },
  placeholderAvatarLarge: { width: "100%", height: "100%", borderRadius: 55, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#FFFFFF" },
  cameraBadge: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#2563EB", width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#FFFFFF" },
  changePhotoText: { marginTop: 16, fontSize: 14, fontWeight: "600", color: "#2563EB" },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "bold", color: "#1E293B", marginBottom: 8 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 16, fontSize: 15, color: "#1E293B" },
  logoutButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: "#FECACA", backgroundColor: "#FEF2F2" },
  logoutButtonText: { color: "#EF4444", fontSize: 15, fontWeight: "bold" }
});