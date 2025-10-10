import Header from '@/components/Header';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const PrivacyPolicy = () => {
  return (
    <BasicContainer>
      <Header title="개인정보 처리방침" />
      <ScrollView>
        <Content>
          소몽일기는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은
          방침을 따릅니다.
        </Content>

        <Title>1. 개인정보의 수집 및 이용 목적</Title>
        <Content>
          소몽일기는 회원가입, 로그인, 꿈 일기 저장 기능을 위해 최소한의
          개인정보를 수집합니다.
        </Content>
        <Content>수집 항목: 이메일, 닉네임, 비밀번호</Content>
        <Content>이용 목적: 회원 관리, 서비스 제공, 문의 응답</Content>

        <Title>2. 개인정보의 보유 및 이용 기간</Title>
        <Content>회원 탈퇴 시 즉시 모든 개인정보를 삭제합니다.</Content>
        <Content>이용자가 직접 요청할 경우, 데이터는 즉시 삭제됩니다.</Content>

        <Title>3. 개인정보 제3자 제공 및 위탁</Title>
        <Content>
          소몽일기는 개인정보를 제3자에게 제공하거나 외부 업체에 위탁하지
          않습니다.
        </Content>

        <Title>4. 이용자의 권리</Title>
        <Content>
          이용자는 언제든지 자신의 개인정보 열람, 수정, 삭제를 요청할 수
          있습니다.
        </Content>
        <Content>
          요청은 앱 내 문의하기 또는 이메일을 통해 접수받습니다.
        </Content>

        <Title>5. 보안 조치</Title>
        <Content>
          개발자는 사용자 정보 보호를 위해 암호화 저장 및 보안 서버를
          사용합니다.
        </Content>

        <Title>6. 문의처</Title>
        <Content>📧 개인정보 관련 문의: lch2023@naver.com</Content>

        <Footer>
          <Content>시행일자: 2025년 10월 15일</Content>
        </Footer>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const Title = styled(BoldText)`
  font-size: 20px;
  line-height: 22px;
  margin-top: 20px;
  margin-bottom: 12px;
  color: ${colors.white};
`;

const Content = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.white};
  margin-bottom: 8px;
`;

const Footer = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default PrivacyPolicy;
