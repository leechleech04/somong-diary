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

export const AuthInputContainer = styled.View`
  margin-top: 24px;
`;

export const AuthInputLabel = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 22px;
`;

export const AuthInput = styled.TextInput`
  padding: 16px;
  border-radius: 8px;
  color: ${colors.black};
  margin-top: 16px;
  font-size: 16px;
  line-height: 18px;
`;

export const BasicNextButton = styled.Pressable`
  width: 100%;
  padding: 20px 0;
  border-radius: 8px;
`;

export const BasicNextButtonText = styled(BoldText)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 22px;
  text-align: center;
`;
