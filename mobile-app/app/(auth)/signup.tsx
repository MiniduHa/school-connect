import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  
  // State for Role Selection
  const [role, setRole] = useState("Student");
  const roles = ["Student", "Parent", "Teacher", "Industry"];

  // State for Shared Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for Role-Specific Form Fields
  const [studentId, setStudentId] = useState("");
  const [childStudentId, setChildStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [staffId, setStaffId] = useState("");
  const [department, setDepartment] = useState("");
  const [medium, setMedium] = useState("");
  
  const [companyName, setCompanyName] = useState("");
  const [brn, setBrn] = useState("");
  const [industryType, setIndustryType] = useState("");
  
  // State for Checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleCreateAccount = () => {
    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validation: Check if Terms are agreed to (for Teacher and Industry)
    if ((role === "Teacher" || role === "Industry") && !agreeTerms) {
      alert("You must agree to the Terms of Service and IT Policy.");
      return;
    }

    console.log(`Creating ${role} account!`);
  };

  // --- REUSABLE UI COMPONENTS ---

  const CustomInput = ({ label, ...props }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );

  const CustomDropdown = ({ label, value, options, onSelect }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity 
          style={styles.dropdownHeader} 
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.8}
        >
          <Text style={[styles.dropdownHeaderText, !value && { color: "#9CA3AF" }]}>
            {value || `Select ${label}`}
          </Text>
          <FontAwesome6 name={isOpen ? "chevron-up" : "chevron-down"} size={14} color="#64748B" />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownList}>
            {options.map((opt: string) => (
              <TouchableOpacity 
                key={opt} 
                style={styles.dropdownItem} 
                onPress={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
              >
                <Text style={[styles.dropdownItemText, value === opt && styles.dropdownItemActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome6 name="arrow-left" size={20} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        {/* Dynamic Titles */}
        <Text style={styles.title}>{role} Sign Up</Text>
        <Text style={styles.subtitle}>Fill in your information to get started</Text>

        {/* Role Selection Dropdown */}
        <CustomDropdown 
          label="Select your role" 
          value={role} 
          options={roles} 
          onSelect={(selectedRole: string) => {
            setRole(selectedRole);
            setAgreeTerms(false); // Reset checkbox when changing roles
          }} 
        />

        {/* --- DYNAMIC FIELDS BASED ON ROLE --- */}

        {/* 1. STUDENT FIELDS */}
        {role === "Student" && (
          <>
            <CustomInput label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
            <CustomInput label="Email Address" placeholder="your@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <CustomInput label="Student ID" placeholder="Enter your Student ID" value={studentId} onChangeText={setStudentId} />
            <CustomInput label="Grade" placeholder="e.g. Grade 10" value={grade} onChangeText={setGrade} />
            <CustomInput label="School Name" placeholder="Enter your School" value={school} onChangeText={setSchool} />
          </>
        )}

        {/* 2. PARENT FIELDS */}
        {role === "Parent" && (
          <>
            <CustomInput label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
            <CustomInput label="Email Address" placeholder="your@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <CustomInput label="Phone Number" placeholder="+94 7X XXX XXXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <CustomInput label="Child's Student ID" placeholder="Enter your child's Student ID" value={childStudentId} onChangeText={setChildStudentId} />
          </>
        )}

        {/* 3. TEACHER FIELDS */}
        {role === "Teacher" && (
          <>
            <CustomInput label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
            <CustomInput label="Email Address" placeholder="your@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <CustomInput label="Phone Number" placeholder="+94 7X XXX XXXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <CustomInput label="Staff ID" placeholder="Enter your Staff ID" value={staffId} onChangeText={setStaffId} />
            
            <CustomDropdown 
              label="Department" 
              value={department} 
              options={["O/L", "Science Stream", "Commerce Stream", "Technology Stream"]} 
              onSelect={setDepartment} 
            />
            <CustomDropdown 
              label="Medium" 
              value={medium} 
              options={["English", "Sinhala", "Tamil"]} 
              onSelect={setMedium} 
            />
            
            <CustomInput label="School Name" placeholder="Enter your School" value={school} onChangeText={setSchool} />
          </>
        )}

        {/* 4. INDUSTRY FIELDS */}
        {role === "Industry" && (
          <>
            <CustomInput label="Company Name" placeholder="Enter company name" value={companyName} onChangeText={setCompanyName} />
            <CustomInput label="Business Registration Number" placeholder="Enter BRN" value={brn} onChangeText={setBrn} />
            
            <CustomDropdown 
              label="Industry Type" 
              value={industryType} 
              options={["IT & Software", "Manufacturing", "Finance", "Healthcare", "Education", "Other"]} 
              onSelect={setIndustryType} 
            />
            
            <CustomInput label="HR Contact Number" placeholder="+94 7X XXX XXXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <CustomInput label="Company Email" placeholder="company@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </>
        )}

        {/* SHARED PASSWORD FIELDS (Appears for all roles) */}
        <CustomInput label="Create Password" placeholder="Create a strong password" value={password} onChangeText={setPassword} secureTextEntry />
        <CustomInput label="Confirm Password" placeholder="Confirm your password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        {/* CONDITIONAL CHECKBOX (Only for Teacher & Industry) */}
        {(role === "Teacher" || role === "Industry") && (
          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
              {agreeTerms && <FontAwesome6 name="check" size={12} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxText}>
              {role === "Teacher" 
                ? "I agree to the School IT Policy and Terms of Service" 
                : "I agree to the IT Policy and Terms of Service"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount} activeOpacity={0.8}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/selection")}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 24,
  },
  
  /* Input Styles */
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: "#1E293B",
  },
  
  /* Custom Dropdown Styles */
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
  },
  dropdownHeaderText: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "500",
  },
  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#64748B",
  },
  dropdownItemActive: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  /* Checkbox Styles */
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  checkboxText: {
    fontSize: 13,
    color: "#475569",
    flex: 1, // Ensures long text wraps properly
  },

  /* Button Styles */
  createButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  /* Login Redirect Styles */
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: "#64748B",
  },
  loginLink: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "bold",
  },
});