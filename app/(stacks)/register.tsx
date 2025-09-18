import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import { colors } from '@/utils/colors';
import styled from 'styled-components/native';
import { AuthHeader } from '@/components/authHeader';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const handleGetCode = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/emailAuth`;

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, { email });
      if (response.status === 200) {
        setIsCodeSent(true);
        setIsEmailVerified(false);
        setCode(null);
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Error during email authentication:', error);
      alert('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/verifyCode`;

    if (!email || !code) {
      alert('이메일과 인증번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, { email, code });
      if (response.status === 200) {
        setIsEmailVerified(true);
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Error during code verification:', error);
      alert('인증번호 확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <BasicContainer>
      <AuthHeader title="회원가입" />
      <MainContainer>
        <EmailInputContainer>
          <EmailInputLabel>이메일</EmailInputLabel>
          <EmailInput
            placeholder="이메일을 입력해주세요."
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            value={email ?? undefined}
            onChangeText={(text: string) => {
              setEmail(text);
              setIsEmailVerified(false);
              setIsCodeSent(false);
              setCode(null);
            }}
            editable={!isCodeSent}
            selectTextOnFocus={!isCodeSent}
            isCodeSent={isCodeSent}
          />
          <GetCodeButton
            onPress={handleGetCode}
            disabled={isEmailVerified}
            isEmailVerified={isEmailVerified}
          >
            <GetCodeButtonText>
              {!isCodeSent ? '인증번호 요청' : '인증번호 재요청'}
            </GetCodeButtonText>
          </GetCodeButton>
        </EmailInputContainer>
        {isCodeSent && (
          <CodeInputContainer>
            <CodeInput
              placeholder="인증번호를 입력해주세요."
              placeholderTextColor={colors.lightGray}
              selectionColor={colors.white}
              keyboardType="numeric"
              value={code ?? undefined}
              onChangeText={(text: string) => setCode(text)}
              editable={!isEmailVerified}
              selectTextOnFocus={!isEmailVerified}
            />
            <VerifyCodeButton
              onPress={handleVerifyCode}
              disabled={isEmailVerified}
              isEmailVerified={isEmailVerified}
            >
              <VerifyCodeButtonText>
                {isEmailVerified ? '인증 완료' : '인증'}
              </VerifyCodeButtonText>
            </VerifyCodeButton>
          </CodeInputContainer>
        )}
      </MainContainer>
      <NextButton isEmailVerified={isEmailVerified} disabled={!isEmailVerified}>
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </BasicContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
`;

const EmailInputContainer = styled.View`
  margin-top: 24px;
`;

const EmailInputLabel = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 22px;
`;

const EmailInput = styled.TextInput<{ isCodeSent: boolean }>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ isCodeSent }: { isCodeSent: boolean }) =>
    isCodeSent ? colors.gray : colors.white};
  color: ${colors.black};
  margin-top: 16px;
  font-size: 16px;
  line-height: 18px;
`;

const GetCodeButton = styled.Pressable<{ isEmailVerified: boolean }>`
  align-self: flex-end;
  margin-top: 8px;
  background-color: ${({ isEmailVerified }: { isEmailVerified: boolean }) =>
    isEmailVerified ? colors.gray : colors.yellow};
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
`;

const GetCodeButtonText = styled(MediumText)`
  font-size: 16px;
  line-height: 18px;
`;

const CodeInputContainer = styled.View`
  margin-top: 40px;
  flex-direction: row;
`;

const CodeInput = styled.TextInput`
  padding: 16px;
  margin-top: 16px;
  font-size: 16px;
  line-height: 18px;
  color: ${colors.white};
  flex-grow: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.white};
`;

const VerifyCodeButton = styled.Pressable<{ isEmailVerified: boolean }>`
  align-self: center;
  margin-left: 16px;
  background-color: ${({ isEmailVerified }: { isEmailVerified: boolean }) =>
    isEmailVerified ? colors.gray : colors.yellow};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 16px;
`;

const VerifyCodeButtonText = styled(MediumText)`
  font-size: 16px;
  line-height: 18px;
`;

const NextButton = styled.Pressable<{ isEmailVerified: boolean }>`
  width: 100%;
  padding: 20px 0;
  border-radius: 8px;
  background-color: ${({ isEmailVerified }: { isEmailVerified: boolean }) =>
    isEmailVerified ? colors.lightPurple : colors.gray};
`;

const NextButtonText = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 22px;
  text-align: center;
`;
