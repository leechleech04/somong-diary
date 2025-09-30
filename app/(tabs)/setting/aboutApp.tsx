import Header from '@/components/Header';
import { colors } from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const aboutApp = () => {
  return (
    <BasicContainer>
      <Header title="소몽일기" />
      <ScrollView>
        <MainIntro>
          당신의 꿈을 기록하고, 해석하며, 새로운 시선으로 탐험하는 공간
          {'\n'}
          소몽일기는 단순한 꿈 일기장이 아니라, 꿈을 통해 나 자신을 발견하는
          특별한 여정을 제공합니다.
        </MainIntro>
        <SubTitle>📝 꿈 일기 기록</SubTitle>
        <SubContent>매일 꾼 꿈을 손쉽게 기록</SubContent>
        <SubContent>감정 태그와 감정 강도로 꿈을 정리</SubContent>
        <SubContent>날짜 순 꿈 일기 목록 확인 가능</SubContent>
        <SubTitle>🔮 AI 꿈 해석</SubTitle>
        <SubContent>기록한 꿈을 인공지능이 요약하고 해석</SubContent>
        <SubContent>꿈 속 상징과 감정 분석을 통해 새로운 통찰 제공</SubContent>
        <SubTitle>📊 감정 히스토리</SubTitle>
        <SubContent>나의 꿈 속 감정을 주/월 단위 차트로 확인</SubContent>
        <SubContent>감정 패턴과 변화를 시각화</SubContent>
        <SubTitle>🛌 자각몽 훈련 (개발 중)</SubTitle>
        <SubContent>현실 점검 과제와 체크리스트 제공</SubContent>
        <SubContent>자각몽 성공률을 추적하고 훈련</SubContent>
        <SubTitle>🧑‍🤝‍🧑 꿈 속 등장인물과 소통 (개발 중)</SubTitle>
        <SubContent>꿈 일기 속 인물을 AI 챗봇으로 재현</SubContent>
        <SubContent>나의 무의식과 대화하는 특별한 경험</SubContent>
        <ComingSoon>
          소몽일기는 단순한 기록 앱이 아니라, 나의 무의식과 감정을 이해하는
          도구로 발전해 나갑니다.
          {'\n'}곧 추가될 기능들과 함께, 꿈의 세계를 더 깊이 탐험해 보세요.
        </ComingSoon>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const MainIntro = styled.Text`
  font-family: 'NotoSansKR_Medium';
  font-size: 20px;
  line-height: 24px;
  color: ${colors.white};
  margin-top: 12px;
  text-align: center;
`;

const SubTitle = styled.Text`
  font-family: 'NotoSansKR_Bold';
  font-size: 18px;
  line-height: 20px;
  color: ${colors.white};
  margin-top: 24px;
`;

const SubContent = styled.Text`
  font-family: 'NotoSansKR_Medium';
  font-size: 14px;
  line-height: 18px;
  color: ${colors.white};
  margin-top: 8px;
`;

const ComingSoon = styled.Text`
  font-family: 'NotoSansKR_Medium';
  font-size: 18px;
  line-height: 24px;
  color: ${colors.gray};
  margin: 20px 0;
`;

export default aboutApp;
