import Header from '@/components/Header';
import { deleteTokens, getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

const DelelteAccount = () => {
  const router = useRouter();

  const handleDeleteAccount = useCallback(async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/deleteUser`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
        },
      });
      if (response.status === 200) {
        deleteTokens();
        Alert.alert(
          '회원 탈퇴가 완료되었습니다. 지금까지 소몽일기를 이용해주셔서 감사합니다 🌙'
        );
        router.replace('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
      return;
    }
  }, [router]);

  return (
    <BasicContainer>
      <Header title="회원탈퇴" />
      <Title>😢 정말 탈퇴하시겠어요?</Title>
      <Content>
        회원탈퇴 시 다음 정보가 즉시 삭제되며, 복구가 불가능합니다.
      </Content>
      <Content>• 회원정보(이메일, 닉네임, 비밀번호)</Content>
      <Content>• 작성한 꿈 일기 및 감정 기록</Content>
      <Content>• 저장된 꿈 해석 기록 및 자각몽 훈련 내역</Content>
      <Content>• 기타 회원 관련 모든 정보</Content>
      <Content>
        탈퇴 후 동일한 이메일로 재가입할 수 있으나, 이전에 작성한 모든 정보는
        복구되지 않습니다.
      </Content>
      <Content>탈퇴하시겠습니까?</Content>
      <DeleteButton
        onPress={() => {
          Alert.alert(
            '회원 탈퇴',
            '회원 탈퇴하시겠습니까? 탈퇴 시 모든 정보가 삭제되며, 복구할 수 없습니다.',
            [
              { text: '취소', style: 'cancel' },
              {
                text: '탈퇴하기',
                style: 'destructive',
                onPress: handleDeleteAccount,
              },
            ]
          );
        }}
      >
        <DeleteButtonText>회원탈퇴</DeleteButtonText>
      </DeleteButton>
    </BasicContainer>
  );
};

const Title = styled(BoldText)`
  font-size: 20px;
  margin-bottom: 20px;
  line-height: 28px;
  color: ${colors.white};
`;

const Content = styled(MediumText)`
  font-size: 16px;
  line-height: 24px;
  color: ${colors.white};
`;

const DeleteButton = styled.Pressable`
  align-self: flex-end;
  background-color: ${colors.red};
  padding: 12px 20px;
  border-radius: 8px;
`;

const DeleteButtonText = styled(BoldText)`
  color: ${colors.white};
  font-size: 16px;
  line-height: 24px;
`;

export default DelelteAccount;
