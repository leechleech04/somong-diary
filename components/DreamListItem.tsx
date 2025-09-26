import { colors } from '@/utils/colors';
import { BoldText } from '@/utils/utilComponents';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { DreamDiary } from './../types/dream';

const DreamListItem = ({ dream }: { dream: DreamDiary }) => {
  const router = useRouter();

  return (
    <Container
      onPress={() => {
        router.push(`/(tabs)/diary/${dream._id}`);
      }}
    >
      <Title numberOfLines={1} ellipsizeMode="tail">
        {dream.title}
      </Title>
      <DateText>{new Date(dream.date).toLocaleDateString('ko-KR')}</DateText>
      {dream.hasAnalysis && (
        <HasAnalysisBadge>✨ AI 해몽 완료</HasAnalysisBadge>
      )}
    </Container>
  );
};

const Container = styled.Pressable`
  width: 100%;
  border: 3px solid ${colors.white};
  border-radius: 8px;
  padding: 16px 20px;
`;

const Title = styled(BoldText)`
  font-size: 20px;
  line-height: 24px;
  color: ${colors.white};
`;

const DateText = styled(BoldText)`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.lightGray};
  margin-top: 8px;
  text-align: right;
`;

const HasAnalysisBadge = styled.Text`
  position: absolute;
  bottom: 16px;
  left: 20px;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.yellow};
`;

export default DreamListItem;
