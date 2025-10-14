import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const StackLayout = () => {
  return (
    <Container>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
`;

export default StackLayout;
