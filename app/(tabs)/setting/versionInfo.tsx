import Header from '@/components/Header';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const VersionInfo = () => {
  return (
    <BasicContainer>
      <Header title="버전 정보" />
      <MediumLabelText>소몽일기 현재 버전</MediumLabelText>
      <BoldContentText>v1.0.0</BoldContentText>
      <MediumLabelText>최종 업데이트</MediumLabelText>
      <BoldContentText>2025-10-15</BoldContentText>
    </BasicContainer>
  );
};

const MediumLabelText = styled(MediumText)`
  color: ${colors.white};
  font-size: 16px;
  line-height: 20px;
  margin-top: 24px;
`;

const BoldContentText = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 24px;
  margin-top: 8px;
`;

export default VersionInfo;
