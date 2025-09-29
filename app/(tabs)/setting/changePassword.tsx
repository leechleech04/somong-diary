import Header from '@/components/Header';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import {
  AuthInput,
  AuthInputContainer,
  AuthInputLabel,
  BasicContainer,
  BoldText,
  MediumText,
} from '@/utils/utilComponents';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import styled from 'styled-components/native';

const changePassword = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const handleChangePassword = async () => {
    if (
      currentPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmNewPassword.length === 0
    ) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    const hasEnglish = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isValidLength = newPassword.length >= 8;
    if (!hasEnglish || !hasNumber || !hasSpecial || !isValidLength) {
      alert(
        '비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자, 특수문자를 모두 포함해야 합니다.'
      );
      return;
    }

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/changePassword`;
    try {
      await axios.post(
        apiUrl,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        }
      );

      alert('비밀번호가 성공적으로 변경되었습니다.');
      router.replace('/(tabs)/setting');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
      return;
    }
  };

  return (
    <BasicContainer>
      <Header title="비밀번호 변경" />
      <ScrollView>
        <AuthInputContainer>
          <AuthInputLabel>현재 비밀번호</AuthInputLabel>
          <PasswordInput
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </AuthInputContainer>
        <AuthInputContainer>
          <AuthInputLabel>새 비밀번호</AuthInputLabel>
          <PasswordInput
            placeholder="새 비밀번호를 입력해주세요."
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <PasswordRules>영문, 숫자, 특수문자 포함 8자 이상</PasswordRules>
        </AuthInputContainer>
        <AuthInputContainer>
          <AuthInputLabel>새 비밀번호 확인</AuthInputLabel>
          <PasswordInput
            placeholder="새 비밀번호를 다시 입력해주세요."
            secureTextEntry={true}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
        </AuthInputContainer>
        <ChangeButton onPress={handleChangePassword}>
          <ChangeButtonText>변경</ChangeButtonText>
        </ChangeButton>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const PasswordInput = styled(AuthInput)`
  background-color: ${colors.white};
`;

const PasswordRules = styled(MediumText)`
  font-size: 16px;
  margin-top: 8px;
  line-height: 18px;
  text-align: right;
  color: ${colors.white};
`;

const ChangeButton = styled.Pressable`
  background-color: ${colors.white};
  margin-top: 32px;
  align-self: flex-end;
  padding: 12px 20px;
  border-radius: 8px;
`;

const ChangeButtonText = styled(BoldText)`
  color: ${colors.backgroundPurple};
  font-size: 20px;
  line-height: 22px;
`;

export default changePassword;
