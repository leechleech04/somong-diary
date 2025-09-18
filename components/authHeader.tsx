import { colors } from '@/utils/colors';
import { BoldText } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

export const AuthHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <Container>
      <GoBackButton onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color={colors.white} />
      </GoBackButton>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: center;

  align-items: center;
  padding: 16px 0;
`;

const GoBackButton = styled.Pressable`
  position: absolute;
  left: 0;
`;

const Title = styled(BoldText)`
  font-size: 28px;
  color: ${colors.white};
  line-height: 28px;
`;
