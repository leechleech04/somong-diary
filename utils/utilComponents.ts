import { colors } from '@/utils/colors';
import styled from 'styled-components/native';

export const BoldText = styled.Text`
  font-family: 'NotoSansKR_Bold';
`;

export const MediumText = styled.Text`
  font-family: 'NotoSansKR_Medium';
`;

export const BasicContainer = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${colors.backgroundPurple};
`;
