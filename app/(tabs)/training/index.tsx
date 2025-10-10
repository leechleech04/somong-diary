import { colors } from '@/utils/colors';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const Training = () => {
  return (
    <BasicContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
      <WaitingImage
        source={require('@/assets/images/waiting-image.png')}
        resizeMode="contain"
      />
      <Title>자각몽 훈련 기능을 준비 중이에요. 조금만 기다려 주세요.</Title>
      <SubTitle>꿈 속을 스스로 탐험할 수 있는 훈련을 곧 만나보세요.</SubTitle>
    </BasicContainer>
  );
};

const WaitingImage = styled.Image`
  width: 100%;
  height: ${Dimensions.get('window').width * (2 / 3)}px;
`;

const Title = styled(BoldText)`
  font-size: 24px;
  line-height: 38px;
  text-align: center;
  color: ${colors.white};
  margin-top: 32px;
`;

const SubTitle = styled(MediumText)`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: ${colors.lightGray};
  margin-top: 16px;
`;

export default Training;
