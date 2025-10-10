import Header from '@/components/Header';
import {
  deleteTokens,
  getAccessTokenFromMemory,
  getRefreshTokenFromSecureStore,
} from '@/utils/authToken';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

const logout = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/logout`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          'X-Refresh-Token': await getRefreshTokenFromSecureStore(),
        },
      });

      if (response.status === 200) {
        await deleteTokens();
        alert(response.data.message);
        router.replace('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [router]);

  return (
    <BasicContainer>
      <Header title="로그아웃" />
      <ScrollView>
        <LogoutButton
          onPress={() => {
            Alert.alert('로그아웃', '로그아웃하시겠습니까?', [
              { text: '취소', style: 'cancel' },
              {
                text: '로그아웃',
                style: 'destructive',
                onPress: handleLogout,
              },
            ]);
          }}
        >
          <LogoutButtonText>로그아웃</LogoutButtonText>
        </LogoutButton>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const LogoutButton = styled.Pressable`
  background-color: ${colors.red};
  margin-top: 20px;
  align-self: flex-end;
  padding: 12px 20px;
  border-radius: 8px;
`;

const LogoutButtonText = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 22px;
`;

export default logout;
