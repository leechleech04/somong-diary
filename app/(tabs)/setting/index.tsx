import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

interface SettingItem {
  id: string;
  title: string;
  onPress: () => void;
}

export default function Setting() {
  const router = useRouter();

  const settingItems = [
    {
      id: '0',
      title: '이메일/비밀번호 변경',
      onPress: () => router.push('/(tabs)/setting/changeInfo'),
    },
    {
      id: '1',
      title: '로그아웃',
      onPress: () => router.push('/(tabs)/setting/logout'),
    },
    {
      id: '2',
      title: '소몽일기 소개',
      onPress: () => router.push('/(tabs)/setting/aboutApp'),
    },
    {
      id: '3',
      title: '문의하기',
      onPress: () => router.push('/(tabs)/setting/contactUs'),
    },
    {
      id: '4',
      title: '버전 정보',
      onPress: () => router.push('/(tabs)/setting/versionInfo'),
    },
    {
      id: '5',
      title: '개인정보 처리방침',
      onPress: () => router.push('/(tabs)/setting/privacyPolicy'),
    },
    {
      id: '6',
      title: '서비스 이용약관',
      onPress: () => router.push('/(tabs)/setting/termsOfService'),
    },
    {
      id: '7',
      title: '오픈소스 라이선스',
      onPress: () => router.push('/(tabs)/setting/openSourceLicenses'),
    },
    {
      id: '8',
      title: '회원탈퇴',
      onPress: () => router.push('/(tabs)/setting/deleteAccount'),
    },
  ];

  return (
    <BasicContainer>
      <SettingHeader>설정</SettingHeader>
      <FlatList
        data={settingItems}
        keyExtractor={(item: SettingItem) => item.id}
        renderItem={({ item }: { item: SettingItem }) => (
          <SettingItem onPress={item.onPress}>
            <ItemText
              isDeleteAccount={item.title === '회원탈퇴' ? true : false}
            >
              {item.title}
            </ItemText>
          </SettingItem>
        )}
      />
    </BasicContainer>
  );
}

const SettingHeader = styled(BoldText)`
  font-size: 28px;
  line-height: 30px;
  color: ${colors.white};
  margin-top: 20px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
  padding-bottom: 10px;
`;

const FlatList = styled.FlatList`
  width: 100%;
`;

const SettingItem = styled.Pressable`
  width: 100%;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`;

const ItemText = styled(BoldText)<{ isDeleteAccount?: boolean }>`
  font-size: 18px;
  line-height: 22px;
  color: ${({ isDeleteAccount }: { isDeleteAccount: boolean }) =>
    isDeleteAccount ? colors.red : colors.white};
`;
