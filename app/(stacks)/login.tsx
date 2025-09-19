import { AuthHeader } from '@/components/authHeader';
import { colors } from '@/utils/colors';
import {
  AuthInput,
  AuthInputContainer,
  AuthInputLabel,
  BasicContainer,
  BasicNextButton,
  BasicNextButtonText,
} from '@/utils/utilComponents';
import styled from 'styled-components/native';

export default function Login() {
  return (
    <BasicContainer>
      <AuthHeader title="로그인" />
      <MainCcontainer>
        <AuthInputContainer>
          <AuthInputLabel>이메일</AuthInputLabel>
          <LoginInput placeholder="이메일을 입력해주세요." />
        </AuthInputContainer>
        <AuthInputContainer>
          <AuthInputLabel>비밀번호</AuthInputLabel>
          <LoginInput
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry={true}
          />
        </AuthInputContainer>
      </MainCcontainer>
      <NextButton>
        <BasicNextButtonText>로그인</BasicNextButtonText>
      </NextButton>
    </BasicContainer>
  );
}

const MainCcontainer = styled.View`
  flex: 1;
`;

const LoginInput = styled(AuthInput)`
  background-color: ${colors.white};
`;

const NextButton = styled(BasicNextButton)`
  background-color: ${colors.lightPurple};
`;
