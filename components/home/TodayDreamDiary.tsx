import { DreamDiary } from '@/types/dream';
import { BoldText, MediumText } from '@/utils/utilComponents';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export default function TodayDreamDiary({
  todayDreamDiary,
}: {
  todayDreamDiary: DreamDiary | null;
}) {
  return (
    <Container>
      <TodayDreamText>오늘의 꿈</TodayDreamText>
      <TodayDreamTitle>{todayDreamDiary?.title}</TodayDreamTitle>
      <TodayDreamContent>{todayDreamDiary?.content}</TodayDreamContent>
      <TodayDreamDate>
        {todayDreamDiary?.date &&
          new Date(todayDreamDiary.date).toLocaleDateString('ko-KR', {
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

const TodayDreamText = styled(BoldText)`
  color: #fff;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
`;

const TodayDreamTitle = styled(BoldText)`
  margin-top: 8px;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
`;

const TodayDreamContent = styled(MediumText)`
  margin-top: 16px;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
`;

const TodayDreamDate = styled(MediumText)`
  color: #000;
  margin-top: 8px;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
`;

const TodayDreamEditButton = styled.Pressable`
  margin-top: 8px;
`;

const TodayDreamEditButtonText = styled(BoldText)`
  font-size: 16px;
  line-height: 18px;
`;
