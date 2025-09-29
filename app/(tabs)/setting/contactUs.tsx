import Header from '@/components/Header';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import styled from 'styled-components/native';

const contactUs = () => {
  const router = useRouter();

  const [contactType, setContactType] = useState<string>('bugReport');
  const [content, setContent] = useState<string>('');

  const sendInquiry = async () => {
    if (content.length === 0) {
      alert('문의 내용을 입력해 주세요.');
    }

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/inquiry/submit`;
    try {
      await axios.post(
        apiUrl,
        {
          contactType,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        }
      );

      alert('문의가 전송되었습니다.');
      router.replace('/(tabs)/setting');
      return;
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('문의 전송에 실패했습니다. 다시 시도해 주세요.');
      return;
    }
  };

  return (
    <BasicContainer>
      <Header title="문의하기" />
      <ScrollView>
        <ContactTypeContainer>
          <ContactTypeItem onPress={() => setContactType('bugReport')}>
            <ContactTypeCheckBox isSelected={contactType === 'bugReport'} />
            <ContactTypeLabel>버그 신고</ContactTypeLabel>
          </ContactTypeItem>
          <ContactTypeItem onPress={() => setContactType('featureRequest')}>
            <ContactTypeCheckBox
              isSelected={contactType === 'featureRequest'}
            />
            <ContactTypeLabel>기능 요청</ContactTypeLabel>
          </ContactTypeItem>
          <ContactTypeItem onPress={() => setContactType('extraInquiry')}>
            <ContactTypeCheckBox isSelected={contactType === 'extraInquiry'} />
            <ContactTypeLabel>기타 문의</ContactTypeLabel>
          </ContactTypeItem>
        </ContactTypeContainer>
        <ContentInput
          placeholder="문의 내용을 입력해 주세요..."
          placeholderTextColor={colors.lightGray}
          multiline
          textAlignVertical="top"
          autonCapitalize="none"
          value={content}
          onChangeText={setContent}
        />
        <SendButton onPress={sendInquiry}>
          <SendButtonText>전송</SendButtonText>
        </SendButton>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const ContactTypeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const ContactTypeItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const ContactTypeLabel = styled(BoldText)`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.white};
  margin-left: 8px;
`;

const ContactTypeCheckBox = styled.View<{ isSelected: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? colors.lightPurple : colors.gray};
`;

const ContentInput = styled.TextInput`
  width: 100%;
  border: 1px solid #ccc;
  color: ${colors.white};
  font-size: 16px;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
  min-height: 400px;
  margin-top: 24px;
`;

const SendButton = styled.Pressable`
  background-color: ${colors.white};
  margin-top: 32px;
  align-self: flex-end;
  padding: 12px 20px;
  border-radius: 8px;
`;

const SendButtonText = styled(BoldText)`
  color: ${colors.backgroundPurple};
  font-size: 20px;
  line-height: 22px;
`;

export default contactUs;
