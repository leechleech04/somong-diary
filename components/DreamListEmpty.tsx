import { colors } from '@/utils/colors';
import { BoldText } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const DreamListEmpty = () => {
  return <EmptyText>아직 작성된 꿈 일기가 없어요!</EmptyText>;
};

const EmptyText = styled(BoldText)`
  font-size: 24px;
  line-height: 26px;
  color: ${colors.gray};
  text-align: center;
  margin-top: 32px;
`;

export default DreamListEmpty;
