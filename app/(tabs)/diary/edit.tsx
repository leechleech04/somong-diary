import Header from '@/components/Header';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import emotions from '@/utils/emotions';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { usePreventRemove } from '@react-navigation/native';
import axios from 'axios';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

const EditDream = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

  usePreventRemove(hasUnsavedChanges, ({ data }) => {
    Alert.alert(
      '변경 내용이 저장되지 않았습니다.',
      '정말로 나가시겠습니까? 변경 내용은 저장되지 않습니다.',
      [
        { text: '취소', style: 'cancel', onPress: () => {} },
        {
          text: '나가기',
          style: 'destructive',
          onPress: () => navigation.dispatch(data.action),
        },
      ]
    );
  });

  const dream_id = params.dream_id;

  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!dream_id) {
      alert('잘못된 접근입니다.');
      router.back();
      return;
    }

    const fetchDreamDiary = async () => {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dreams/detail/${dream_id}`;
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        });

        if (!response.data.dream) {
          alert('존재하지 않는 꿈 일기입니다.');
          router.back();
          return;
        }

        const dreamDiary = response.data.dream;
        setTitle(dreamDiary.title);
        setContent(dreamDiary.content);
        setEmotion(dreamDiary.emotion);
        setIntensity(dreamDiary.intensity || 1);
        setDate(new Date(dreamDiary.date));
      } catch (error) {
        console.error('Error fetching dream diary:', error);
        alert('꿈 일기를 불러오는데 실패했습니다. 다시 시도해 주세요.');
        router.back();
      }
    };

    fetchDreamDiary();
  }, [dream_id]);

  const saveEditedDream = useCallback(async () => {
    if (!dream_id) {
      alert('잘못된 접근입니다.');
      router.back();
      return;
    }

    if (!title || !content) {
      alert('제목과 내용을 입력해 주세요');
      return;
    }

    if (emotion && !emotions.some((emo) => emo.name === emotion)) {
      alert('유효한 감정을 선택해 주세요');
      return;
    }

    setHasUnsavedChanges(false);

    const currentDate = date || new Date();

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dreams/edit/${dream_id}`;
    try {
      await axios.put(
        apiUrl,
        {
          title,
          content,
          emotion: emotion || null,
          intensity: emotion ? intensity || 1 : null,
          date: currentDate.toISOString().split('T')[0],
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        }
      );
      alert('꿈 일기가 수정되었습니다.');
      router.replace(`/(tabs)/diary/${dream_id}`);
    } catch (error) {
      console.error('Error saving edited dream:', error);
      alert('꿈 일기 수정에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [dream_id, title, content, emotion, intensity, date]);

  return (
    <BasicContainer>
      <ScrollView>
        <Header title="일기 수정" />
        <TitleInput
          placeholder="꿈의 제목을 입력해 주세요"
          placeholderTextColor={colors.lightGray}
          autonCapitalize="none"
          value={title}
          onChangeText={setTitle}
        />
        <ContentInput
          placeholder="꿈의 내용을 입력해 주세요..."
          placeholderTextColor={colors.lightGray}
          multiline
          numberOfLines={40}
          textAlignVertical="top"
          autonCapitalize="none"
          value={content}
          onChangeText={setContent}
        />
        <EmotionButtonContainer>
          {emotions.map((emo) => (
            <EmotionButton
              key={emo.name}
              isSelected={emotion === emo.name}
              onPress={() => {
                setEmotion(emotion === emo.name ? null : emo.name);
                setIntensity(null);
              }}
            >
              <EmotionButtonText isSelected={emotion === emo.name}>
                {`${emo.name} ${emo.emoji}`}
              </EmotionButtonText>
            </EmotionButton>
          ))}
        </EmotionButtonContainer>
        <EmotionContainer>
          <EmotionIntensityLabel>
            감정 강도: {intensity || 0}
          </EmotionIntensityLabel>
          <EmotionIntensitySlider
            value={intensity || 0}
            onValueChange={setIntensity}
            disabled={!emotion}
          />
        </EmotionContainer>
        <DateContainer>
          <DatePickButton onPress={() => setShowDatePicker(true)}>
            <DatePickButtonText>날짜 선택</DatePickButtonText>
          </DatePickButton>
          <DateText>
            {date
              ? date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '날짜를 선택해 주세요'}
          </DateText>
          {showDatePicker && (
            <DatePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={(_: any, selectedDate?: Date) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}
        </DateContainer>
        <SaveButton onPress={saveEditedDream}>
          <SaveButtonText>수정</SaveButtonText>
        </SaveButton>
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const TitleInput = styled.TextInput`
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: #ccc;
  color: ${colors.white};
  font-size: 24px;
  font-weight: bold;
  margin: 0;
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
`;

const EmotionButtonContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const EmotionButton = styled.Pressable<{ isSelected: boolean }>`
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? colors.lightPurple : colors.white};
  margin-right: 12px;
`;

const EmotionButtonText = styled(BoldText)<{ isSelected: boolean }>`
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? colors.white : colors.black};
  font-size: 16px;
  line-height: 18px;
`;

const EmotionContainer = styled.View`
  width: 100%;
  margin-top: 8px;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const EmotionIntensityLabel = styled(MediumText)`
  color: ${colors.white};
  font-size: 16px;
  line-height: 18px;
  text-align: center;
`;

const EmotionIntensitySlider = styled(Slider).attrs({
  minimumValue: 1,
  maximumValue: 10,
  step: 1,
  minimumTrackTintColor: colors.lightPurple,
  maximumTrackTintColor: colors.lightGray,
  thumbTintColor: colors.white,
})`
  height: 40px;
  flex-grow: 1;
`;

const DateContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
`;

const DatePickButton = styled.Pressable`
  background-color: ${colors.lightPurple};
  align-self: flex-start;
  padding: 12px 20px;
  border-radius: 8px;
`;

const DatePickButtonText = styled(MediumText)`
  color: ${colors.white};
  font-size: 16px;
  line-height: 18px;
  text-align: center;
`;

const DateText = styled(MediumText)`
  color: ${colors.white};
  font-size: 16px;
  line-height: 18px;
  margin-left: 16px;
`;

const DatePicker = styled(DateTimePicker)``;

const SaveButton = styled.Pressable`
  background-color: ${colors.white};
  margin-top: 32px;
  align-self: flex-end;
  padding: 12px 20px;
  border-radius: 8px;
`;

const SaveButtonText = styled(BoldText)`
  color: ${colors.backgroundPurple};
  font-size: 20px;
  line-height: 22px;
`;

export default EditDream;
