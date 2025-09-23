import { colors } from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

export default function List() {
  const router = useRouter();

  return (
    <BasicContainer>
      <WriteDreamButton
        onPress={() => {
          router.push('/(tabs)/diary/new');
        }}
      >
        <WriteDreamIcon />
      </WriteDreamButton>
    </BasicContainer>
  );
}

const WriteDreamButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 32px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${colors.lightPurple};
`;

const WriteDreamIcon = styled(Ionicons).attrs({
  name: 'pencil',
  size: 32,
  color: colors.white,
})``;
