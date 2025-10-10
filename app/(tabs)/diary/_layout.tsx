import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="new" />
      <Stack.Screen name="[dream_id]" />
      <Stack.Screen name="edit" />
    </Stack>
  );
};

export default Layout;
