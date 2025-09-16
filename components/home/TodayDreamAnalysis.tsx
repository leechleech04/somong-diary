import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export default function TodayDreamAnalysis({
  todayDreamAnalysis,
}: {
  todayDreamAnalysis: string | null;
}) {
  return (
    <Container>
      <TodayAnalysisText>오늘의 꿈 해석</TodayAnalysisText>
      <TodayAnalysisContent>{todayDreamAnalysis}</TodayAnalysisContent>
    </Container>
  );
}

const Container = styled(LinearGradient).attrs({
  colors: ['#e3d095', '#fff'],
})`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const TodayAnalysisText = styled.Text`
  color: #707070;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

const TodayAnalysisContent = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  line-height: 24px;
`;
