import {
  getRefreshTokenFromSecureStore,
  setAccessTokenToMemory,
} from '@/utils/authToken';
import { colors } from '@/utils/colors';
import axios from 'axios';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();

  const [isFontLoaded, fontError] = useFonts({
    NotoSansKR_Medium: require('../assets/fonts/NotoSansKR-Medium.ttf'),
    NotoSansKR_Bold: require('../assets/fonts/NotoSansKR-Bold.ttf'),
  });

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = [
          require('../assets/images/home-image.png'),
          require('../assets/images/waiting-image.png'),
        ];

        await Asset.loadAsync(images);
        setIsImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsImagesLoaded(true);
      }
    };

    loadImages();
  }, []);

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
      } catch (fontError) {
        console.error('Error checking login status:', fontError);
      } finally {
        setIsAuthChecked(true);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if ((isFontLoaded || fontError) && isAuthChecked) {
      if (isLoggedIn) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/');
      }
      SplashScreen.hideAsync();
    }
  }, [isFontLoaded, fontError, isAuthChecked, isLoggedIn, router]);

  if ((!isFontLoaded && !fontError) || !isAuthChecked) {
    return null;
  }

  return (
    <Container>
      <Slot />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundPurple};
`;

export default RootLayout;
