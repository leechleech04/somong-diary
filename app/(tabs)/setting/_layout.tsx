import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="changeInfo" />
      <Stack.Screen name="logout" />
      <Stack.Screen name="aboutApp" />
      <Stack.Screen name="contactUs" />
      <Stack.Screen name="versionInfo" />
      <Stack.Screen name="privacyPolicy" />
      <Stack.Screen name="termsOfService" />
      <Stack.Screen name="openSourceLicenses" />
      <Stack.Screen name="deleteAccount" />
    </Stack>
  );
}
