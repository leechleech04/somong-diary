import { DreamRecord } from '@/types/dream';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export default function TodayDreamRecord({
  todayDreamRecord,
}: {
  todayDreamRecord: DreamRecord | null;
}) {
  return (
    <Container>
      <TodayDreamText>오늘의 꿈</TodayDreamText>
      <TodayDreamTitle>{todayDreamRecord?.title}</TodayDreamTitle>
      <TodayDreamContent>{todayDreamRecord?.content}</TodayDreamContent>
      <TodayDreamDate>
        {todayDreamRecord?.date &&
          new Date(todayDreamRecord.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
      </TodayDreamDate>
      <TodayDreamEditButton>
        <TodayDreamEditButtonText>수정하기</TodayDreamEditButtonText>
      </TodayDreamEditButton>
    </Container>
  );
}

const Container = styled(LinearGradient).attrs({
  colors: ['#483aa0', '#7963c1'],
  start: { x: 0.5, y: 0.7 },
})`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const TodayDreamText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

const TodayDreamTitle = styled.Text`
  margin-top: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const TodayDreamContent = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  color: #fff;
`;

const TodayDreamDate = styled.Text`
  color: #000;
  margin-top: 8px;
  font-size: 12px;
  text-align: right;
`;

const TodayDreamEditButton = styled.Pressable`
  margin-top: 8px;
`;

const TodayDreamEditButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
