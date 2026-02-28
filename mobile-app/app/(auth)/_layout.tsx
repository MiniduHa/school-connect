import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="selection" />
      <Stack.Screen name="student-login" />
      <Stack.Screen name="parent-login" />
      <Stack.Screen name="teacher-login" />
      <Stack.Screen name="industry-login" />
      {/* Make sure you actually have a signup.tsx file in your folder! */}
      <Stack.Screen name="signup" /> 
    </Stack>
  );
}