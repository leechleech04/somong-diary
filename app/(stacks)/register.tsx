import Header from '@/components/Header';
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
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const Register = () => {
  const router = useRouter();

  const { email } = useLocalSearchParams<{ email?: string }>();

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = useCallback(async () => {
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

    if (!agreeTerms || !agreePrivacy || !agreeAge) {
      alert('모든 필수 약관에 동의해야 합니다.');
      return;
    }

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/register`;

    try {
      const response = await axios.post(apiUrl, {
        email,
        username,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        setIsRegistered(true);
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  }, [
    email,
    username,
    password,
    confirmPassword,
    agreeTerms,
    agreePrivacy,
    agreeAge,
  ]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <BasicContainer>
          <Header title="회원가입" />
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
                editable={!isRegistered}
                selectTextOnFocus={!isRegistered}
              />
            </AuthInputContainer>
            <AuthInputContainer>
              <AuthInputLabel>비밀번호</AuthInputLabel>
              <PasswordInput
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                editable={!isRegistered}
                selectTextOnFocus={!isRegistered}
              />
              <PasswordRules>영문, 숫자, 특수문자 포함 8자 이상</PasswordRules>
            </AuthInputContainer>
            <AuthInputContainer>
              <AuthInputLabel>비밀번호 확인</AuthInputLabel>
              <PasswordInput
                placeholder="비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                editable={!isRegistered}
                selectTextOnFocus={!isRegistered}
              />
            </AuthInputContainer>
            <AgreeContainer>
              <AgreeCheckbox
                onPress={() => setAgreeTerms(!agreeTerms)}
                checked={agreeTerms}
              >
                {agreeTerms && (
                  <Ionicons name="checkmark" size={20} color={colors.white} />
                )}
              </AgreeCheckbox>
              <AgreeText>(필수) 소몽일기 이용약관에 동의합니다</AgreeText>
              <ViewAgreeContent onPress={() => router.push('/termsOfService')}>
                <ViewAgreeContentText>[보기]</ViewAgreeContentText>
              </ViewAgreeContent>
            </AgreeContainer>
            <AgreeContainer>
              <AgreeCheckbox
                onPress={() => setAgreePrivacy(!agreePrivacy)}
                checked={agreePrivacy}
              >
                {agreePrivacy && (
                  <Ionicons name="checkmark" size={20} color={colors.white} />
                )}
              </AgreeCheckbox>
              <AgreeText>(필수) 개인정보 처리방침에 동의합니다</AgreeText>
              <ViewAgreeContent onPress={() => router.push('/privacyPolicy')}>
                <ViewAgreeContentText>[보기]</ViewAgreeContentText>
              </ViewAgreeContent>
            </AgreeContainer>
            <AgreeContainer>
              <AgreeCheckbox
                onPress={() => setAgreeAge(!agreeAge)}
                checked={agreeAge}
              >
                {agreeAge && (
                  <Ionicons name="checkmark" size={20} color={colors.white} />
                )}
              </AgreeCheckbox>
              <AgreeText>(필수) 본인은 만 14세 이상입니다</AgreeText>
            </AgreeContainer>
          </MainContainer>
          <RegisterButton disabled={isRegistered} onPress={handleRegister}>
            <BasicNextButtonText>회원가입</BasicNextButtonText>
          </RegisterButton>
          <NextButton
            disabled={!isRegistered}
            onPress={() => router.push({ pathname: '/(stacks)/login' })}
          >
            <BasicNextButtonText>로그인</BasicNextButtonText>
          </NextButton>
        </BasicContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const MainContainer = styled.ScrollView`
  flex: 1;
`;

const EmailInput = styled(AuthInput)`
  background-color: ${colors.gray};
`;

const UsernameInput = styled(AuthInput)<{ editable: boolean }>`
  background-color: ${({ editable }: { editable: boolean }) =>
    editable ? colors.white : colors.gray};
`;

const PasswordInput = styled(AuthInput)<{ editable: boolean }>`
  background-color: ${({ editable }: { editable: boolean }) =>
    editable ? colors.white : colors.gray};
`;

const PasswordRules = styled(MediumText)`
  font-size: 16px;
  margin-top: 8px;
  line-height: 18px;
  text-align: right;
  color: ${colors.white};
`;

const AgreeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const AgreeCheckbox = styled.Pressable<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${colors.white};
  background-color: ${({ checked }: { checked: boolean }) =>
    checked ? colors.lightPurple : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const AgreeText = styled(MediumText)`
  font-size: 14px;
  line-height: 16px;
  color: ${colors.white};
`;

const ViewAgreeContent = styled.Pressable``;

const ViewAgreeContentText = styled(MediumText)`
  font-size: 14px;
  line-height: 16px;
  color: ${colors.lightPurple};
  margin-left: 8px;
`;

const RegisterButton = styled(BasicNextButton)<{ disabled: boolean }>`
  margin-bottom: 12px;
  background-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? colors.gray : colors.lightPurple};
`;

const NextButton = styled(BasicNextButton)<{ disabled: boolean }>`
  background-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? colors.gray : colors.lightPurple};
`;

export default Register;
