import { AuthHeader } from '@/components/authHeader';
import { colors } from '@/utils/colors';
import {
  AuthInput,
  AuthInputContainer,
  AuthInputLabel,
  BasicContainer,
  BasicNextButton,
  BasicNextButtonText,
  MediumText,
} from '@/utils/utilComponents';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import styled from 'styled-components/native';

const Register = () => {
  const router = useRouter();

  const { email } = useLocalSearchParams<{ email?: string }>();

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const hasEnglish = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;
    if (!hasEnglish || !hasNumber || !hasSpecial || !isValidLength) {
      alert(
        '비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자, 특수문자를 모두 포함해야 합니다.'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  };

  return (
    <BasicContainer>
      <AuthHeader title="회원가입" />
      <MainContainer>
        <AuthInputContainer>
          <AuthInputLabel>이메일</AuthInputLabel>
          <EmailInput editable={false} selectTextOnFocus={false}>
            {email}
          </EmailInput>
        </AuthInputContainer>
        <AuthInputContainer>
          <AuthInputLabel>이름</AuthInputLabel>
          <UsernameInput
            placeholder="이름을 입력해주세요."
            value={username}
            onChangeText={setUsername}
          />
        </AuthInputContainer>
        <AuthInputContainer>
          <AuthInputLabel>비밀번호</AuthInputLabel>
          <PasswordInput
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChangeText={setPassword}
          />
          <PasswordRules>영문, 숫자, 특수문자 포함 8자 이상</PasswordRules>
        </AuthInputContainer>
        <AuthInputContainer>
          <AuthInputLabel>비밀번호 확인</AuthInputLabel>
          <PasswordInput
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </AuthInputContainer>
      </MainContainer>
      <RegisterButton onPress={handleRegister}>
        <RegisterButtonText>회원가입</RegisterButtonText>
      </RegisterButton>
      <NextButton
        disabled={!isRegistered}
        onPress={() => router.push({ pathname: '/(stacks)/login' })}
      >
        <NextButtonText>로그인</NextButtonText>
      </NextButton>
    </BasicContainer>
  );
};

const MainContainer = styled.View`
  flex: 1;
`;

const EmailInput = styled(AuthInput)`
  background-color: ${colors.gray};
`;

const UsernameInput = styled(AuthInput)`
  background-color: ${colors.white};
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

const RegisterButton = styled(BasicNextButton)<{ disabled: boolean }>`
  margin-bottom: 12px;
  background-color: ${colors.lightPurple};
`;

const RegisterButtonText = styled(BasicNextButtonText)``;

const NextButton = styled(BasicNextButton)<{ disabled: boolean }>`
  background-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? colors.gray : colors.lightPurple};
`;

const NextButtonText = styled(BasicNextButtonText)``;

export default Register;
