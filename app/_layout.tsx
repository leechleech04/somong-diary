import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export default function RootLayout() {
  return (
    <Container>
      <Slot />
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #000;
`;
