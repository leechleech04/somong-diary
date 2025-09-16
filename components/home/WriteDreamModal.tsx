import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export default function WriteDreamModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <ModalText>오늘 꾼 꿈,{'\n'}잊기 전에 적어보세요 🌙</ModalText>
      <ModalButton>
        <ModalButtonText>오늘의 꿈 기록하기</ModalButtonText>
      </ModalButton>
      <CloseModalButton
        onPress={() => {
          onClose();
        }}
      >
        <CloseModal />
      </CloseModalButton>
    </Modal>
  );
}

const Modal = styled(LinearGradient).attrs({
  colors: ['#483aa0', '#7963c1'],
})`
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ModalText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const ModalButton = styled.Pressable`
  background-color: #e3d095;
  margin-top: 20px;
  border-radius: 8px;
  align-self: flex-end;
  flex-direction: row;
  padding: 12px 20px;
`;

const ModalButtonText = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: bold;
`;

const CloseModalButton = styled.Pressable`
  position: absolute;
  top: 16px;
  right: 24px;
`;

const CloseModal = styled(Ionicons).attrs({
  name: 'close',
  size: 24,
  color: '#000',
})``;
