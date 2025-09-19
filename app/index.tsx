import { colors } from '@/utils/colors';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import styled from 'styled-components/native';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return (
      <Container>
        <MainImage
          source={require('@/assets/images/main-image.png')}
          resizeMode="contain"
        />
        <MainComment>당신의 작은 꿈이 머무는 공간</MainComment>
        <Title>소몽일기</Title>
        <LoginButton
          onPress={() => {
            router.push('/(stacks)/login');
          }}
        >
          <ButtonText>로그인</ButtonText>
        </LoginButton>
        <RegisterButton
          onPress={() => {
            router.push('/(stacks)/verifyEmail');
          }}
        >
          <ButtonText>회원가입</ButtonText>
        </RegisterButton>
      </Container>
    );
  }
}

const Container = styled(BasicContainer)`
  flex: 1;
  background-color: ${colors.backgroundPurple};
  padding: 0 24px;
`;

const MainImage = styled.Image`
  width: 100%;
  flex: 1;
`;

const MainComment = styled(MediumText)`
  font-size: 24px;
  line-height: 28px;
  color: ${colors.yellow};
  text-align: center;
  margin-bottom: 16px;
`;

const Title = styled(BoldText)`
  font-size: 40px;
  line-height: 44px;
  color: ${colors.white};
  text-align: center;
  margin-bottom: 100px;
`;

const Button = styled.Pressable`
  width: 100%;
  padding: 20px 0;
  border-radius: 8px;
`;

const ButtonText = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 22px;
  text-align: center;
`;

const LoginButton = styled(Button)`
  background-color: ${colors.lightPurple};
  margin-bottom: 12px;
`;

const RegisterButton = styled(Button)`
  background-color: ${colors.purple};
`;
