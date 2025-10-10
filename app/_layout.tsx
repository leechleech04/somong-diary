import {
  getRefreshTokenFromSecureStore,
  setAccessTokenToMemory,
} from '@/utils/authToken';
import { colors } from '@/utils/colors';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const deleteTokensFunc = async () => {
  //     await deleteTokens();
  //   };
  //   deleteTokensFunc();
  // }, []);

  const [isFontLoaded, error] = useFonts({
    NotoSansKR_Medium: require('../assets/fonts/NotoSansKR-Medium.ttf'),
    NotoSansKR_Bold: require('../assets/fonts/NotoSansKR-Bold.ttf'),
  });

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const refreshToken = await getRefreshTokenFromSecureStore();
        if (refreshToken) {
          const verifyTokenUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/verifyRefreshToken`;
          const response = await axios.get(verifyTokenUrl, {
            headers: {
              'X-Refresh-Token': refreshToken,
            },
          });
          if (response.status === 200) {
            const refreshUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`;
            const refreshResponse = await axios.get(refreshUrl, {
              headers: {
                'X-Refresh-Token': refreshToken,
              },
            });
            if (refreshResponse.status === 200) {
              setAccessTokenToMemory(refreshResponse.data.accessToken);
              setIsLoggedIn(true);
            }
          } else {
            setIsLoggedIn(false);
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsAuthChecked(true);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if ((isFontLoaded || error) && isAuthChecked) {
      SplashScreen.hideAsync();
    }
  }, [isFontLoaded, error, isAuthChecked]);

  useEffect(() => {
    if (isAuthChecked) {
      if (isLoggedIn) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/');
      }
    }
  }, [isAuthChecked, isLoggedIn, router]);

  if ((!isFontLoaded && !error) || !isAuthChecked) {
    return null;
  }

  return (
    <Container>
      <Slot />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.backgroundPurple};
`;

export default RootLayout;
