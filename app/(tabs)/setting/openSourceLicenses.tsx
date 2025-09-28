import Header from '@/components/Header';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import styled from 'styled-components/native';

const openSourceLicenses = () => {
  return (
    <BasicContainer>
      <ScrollView>
        <Header title="오픈소스 라이선스" />
        <SectionText>[Core Libraries]</SectionText>
        <ItemText>React - MIT License</ItemText>
        <ItemText>React DOM - MIT License</ItemText>
        <ItemText>React Native - MIT License</ItemText>
        <SectionText>[Expo SDK]</SectionText>
        <ItemText>Expo - MIT License</ItemText>
        <ItemText>Expo Constants - MIT License</ItemText>
        <ItemText>Expo Font - MIT License</ItemText>
        <ItemText>Expo Haptics - MIT License</ItemText>
        <ItemText>Expo Image - MIT License</ItemText>
        <ItemText>Expo Linear Gradient - MIT License</ItemText>
        <ItemText>Expo Linking - MIT License</ItemText>
        <ItemText>Expo Router - MIT License</ItemText>
        <ItemText>Expo Secure Store - MIT License</ItemText>
        <ItemText>Expo Splash Screen - MIT License</ItemText>
        <ItemText>Expo Status Bar - MIT License</ItemText>
        <ItemText>Expo Symbols - MIT License</ItemText>
        <ItemText>Expo System UI - MIT License</ItemText>
        <ItemText>Expo Web Browser - MIT License</ItemText>
        <SectionText>[Navigation]</SectionText>
        <ItemText>@react-navigation/native - MIT License</ItemText>
        <ItemText>@react-navigation/bottom-tabs - MIT License</ItemText>
        <ItemText>@react-navigation/elements - MIT License</ItemText>
        <SectionText>[UI / Utils]</SectionText>
        <ItemText>@expo/vector-icons - MIT License</ItemText>
        <ItemText>
          @react-native-community/datetimepicker - MIT License
        </ItemText>
        <ItemText>@react-native-community/slider - MIT License</ItemText>
        <ItemText>@shopify/flash-list - MIT License</ItemText>
        <ItemText>React Native Chart Kit - MIT License</ItemText>
        <ItemText>React Native Gesture Handler - MIT License</ItemText>
        <ItemText>React Native Reanimated - MIT License</ItemText>
        <ItemText>React Native Safe Area Context - MIT License</ItemText>
        <ItemText>React Native Screens - MIT License</ItemText>
        <ItemText>React Native SVG - MIT License</ItemText>
        <ItemText>React Native Worklets - MIT License</ItemText>
        <ItemText>Styled Components - MIT License</ItemText>
        <SectionText>[Networking]</SectionText>
        <ItemText>Axios - MIT License</ItemText>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const SectionText = styled(BoldText)`
  color: ${colors.red};
  font-size: 20px;
  line-height: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ItemText = styled(MediumText)`
  color: ${colors.white};
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
`;

export default openSourceLicenses;
