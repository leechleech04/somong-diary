import Header from '@/components/Header';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const TermsOfService = () => {
  return (
    <BasicContainer>
      <Header title="서비스 이용약관" />
      <ScrollView>
        <Title>제1조 (목적)</Title>
        <Content>
          본 약관은 개인 개발자가 제공하는 「소몽일기」 앱(이하 "서비스")의
          이용조건 및 절차, 이용자와 개발자 간의 권리, 의무 및 책임사항을
          규정함을 목적으로 합니다.
        </Content>

        <Title>제2조 (서비스의 성격)</Title>
        <Content>
          소몽일기는 개인 프로젝트로 개발된 앱으로, 상업적 목적 없이 개인 이용자
          간의 꿈 기록, 해석, 감정 분석 등의 기능을 제공합니다.
        </Content>
        <Content>
          개발자는 서비스의 운영 및 유지보수를 위해 필요한 범위 내에서만
          데이터를 활용합니다.
        </Content>

        <Title>제3조 (이용자의 의무)</Title>
        <Content>
          이용자는 본 서비스를 법령 및 공공질서에 반하지 않도록 이용해야 합니다.
        </Content>
        <Content>
          타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.
        </Content>
        <Content>
          이용자는 서비스 내 게시물에 대한 저작권과 책임을 가집니다.
        </Content>

        <Title>제4조 (개발자의 책임)</Title>
        <Content>
          개발자는 안정적인 서비스 제공을 위해 노력하며, 서버 점검이나 기술적
          문제로 인해 일시적으로 서비스가 중단될 수 있습니다.
        </Content>
        <Content>
          이 경우 개발자는 가능한 한 빠르게 복구하도록 노력합니다.
        </Content>

        <Title>제5조 (서비스 변경 및 종료)</Title>
        <Content>
          본 서비스는 개인 프로젝트 특성상 예고 없이 일부 기능이 수정되거나
          종료될 수 있습니다.
        </Content>
        <Content>
          중단 시 사전 공지를 위해 앱 내 알림 또는 공지사항을 제공합니다.
        </Content>

        <Title>제6조 (문의 및 연락처)</Title>
        <Content>
          서비스 이용 중 문의사항이나 오류 신고는 아래 이메일로 접수할 수
          있습니다.
        </Content>
        <Content>📧 문의: lch2023@naver.com</Content>

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

export default TermsOfService;
