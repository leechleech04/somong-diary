import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import { colors } from '@/utils/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isFontLoaded, error] = useFonts({
    NotoSansKR_Medium: require('@/assets/fonts/NotoSansKR-Medium.ttf'),
    NotoSansKR_Bold: require('@/assets/fonts/NotoSansKR-Bold.ttf'),
  });

  useEffect(() => {
    if (isFontLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [isFontLoaded, error]);
  if (!isFontLoaded && !error) {
    return null;
  }

  return (
    <Container>
      <Slot />
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.backgroundPurple};
`;
