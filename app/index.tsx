import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  } else {
    return (
      <Container>
        <MainImage
          source={require('@/assets/images/main-image.png')}
          resizeMode="contain"
        />
        <MainComment>당신의 작은 꿈이 머무는 공간</MainComment>
        <Title>소몽일기</Title>
        <LoginButton onPress={() => {}}>
          <LoginButtonText>로그인</LoginButtonText>
        </LoginButton>
        <RegisterButton onPress={() => {}}>
          <RegisterButtonText>회원가입</RegisterButtonText>
        </RegisterButton>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #0c1639;
  padding: 0 24px;
`;

const MainImage = styled.Image`
  width: 100%;
  flex: 1;
`;

const MainComment = styled.Text`
  color: #e8c087;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 100px;
`;

const Button = styled.Pressable`
  width: 100%;
  padding: 16px 0;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const LoginButton = styled(Button)`
  background-color: #7965c1;
`;

const LoginButtonText = styled(ButtonText)``;

const RegisterButton = styled(Button)`
  background-color: #483aa0;
`;

const RegisterButtonText = styled(ButtonText)``;
