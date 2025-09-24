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
  font-size: 24px;
  line-height: 28px;
  color: ${colors.white};
`;

const DateText = styled(BoldText)`
  font-size: 14px;
  line-height: 18px;
  color: ${colors.lightGray};
  margin-top: 8px;
  text-align: right;
`;

export default DreamListItem;
