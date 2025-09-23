import { colors } from '@/utils/colors';
import { BasicContainer, BoldText, MediumText } from '@/utils/utilComponents';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import styled from 'styled-components/native';

const New = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <BasicContainer>
      <ScrollView>
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
        <EmotionInput
          placeholder="감정 입력 ex) 행복, 슬픔..."
          autonCapitalize="none"
          value={emotion}
          onChangeText={setEmotion}
        />
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
        <SaveButton>
          <SaveButtonText>저장</SaveButtonText>
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

const EmotionInput = styled.TextInput`
  margin-top: 16px;
  background-color: ${colors.lightPurple};
  width: 100%;
  padding: 8px;
  color: ${colors.white};
  font-size: 16px;
  border-radius: 8px;
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

export default New;
