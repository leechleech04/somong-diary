import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const NotFound = () => {
  return (
    <BasicContainer>
      <NotFoundImage
        source={require('@/assets/images/waiting-image.png')}
        resizeMode="contain"
      />
      <Title>페이지를 찾을 수 없어요.</Title>
    </BasicContainer>
  );
};

const NotFoundImage = styled.Image`
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

export default NotFound;
