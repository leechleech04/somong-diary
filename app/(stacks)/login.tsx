import Header from '@/components/Header';
import { saveTokens } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import {
  AuthInput,
  AuthInputContainer,
  AuthInputLabel,
  BasicContainer,
  BasicNextButton,
  BasicNextButtonText,
} from '@/utils/utilComponents';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/login`;

    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
      });
      if (response.status === 200) {
        alert('로그인에 성공했습니다.');
        await saveTokens(response.data.accessToken, response.data.refreshToken);
        router.push({ pathname: '/(tabs)/home' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }, [email, password, router]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <BasicContainer>
          <Header title="로그인" />
          <MainCcontainer>
            <AuthInputContainer>
              <AuthInputLabel>이메일</AuthInputLabel>
              <LoginInput
                placeholder="이메일을 입력해주세요."
                value={email}
                onChangeText={setEmail}
              />
            </AuthInputContainer>
            <AuthInputContainer>
              <AuthInputLabel>비밀번호</AuthInputLabel>
              <LoginInput
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </AuthInputContainer>
          </MainCcontainer>
          <NextButton onPress={handleLogin}>
            <BasicNextButtonText>로그인</BasicNextButtonText>
          </NextButton>
        </BasicContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const MainCcontainer = styled.View`
  flex: 1;
`;

const LoginInput = styled(AuthInput)`
  background-color: ${colors.white};
`;

const NextButton = styled(BasicNextButton)`
  background-color: ${colors.lightPurple};
`;

export default Login;
