import Header from '@/components/Header';
import { DreamDiaryType } from '@/types/dream';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import {
  BasicContainer,
  BasicNextButton,
  BasicNextButtonText,
  BoldText,
  MediumText,
} from '@/utils/utilComponents';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';

const DreamDetail = () => {
  const router = useRouter();

  const local = useLocalSearchParams();
  const dreamDiary_id = local.dream_id;

  const [dreamDiary, setDreamDiary] = useState<DreamDiaryType | null>(null);
  const [dreamAnalysis, setDreamAnalysis] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dreamDiary_id) {
      router.back();
      return;
    }

    const fetchDreamDiary = async () => {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dreams/detail/${dreamDiary_id}`;
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

        setDreamDiary(response.data.dream);
      } catch (error) {
        console.error('Error fetching dream diary:', error);
        alert('꿈 일기 상세를 불러오는데 실패했습니다. 다시 시도해 주세요.');
        router.back();
      }
    };

    fetchDreamDiary();
  }, [dreamDiary_id]);

  useEffect(() => {
    if (!dreamDiary_id) {
      router.back();
      return;
    }

    const fetchDreamAnalysis = async () => {
      if (!dreamDiary?.hasAnalysis) return;

      const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/analysis/existing/${dreamDiary_id}`;
      try {
        setIsLoading(true);
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        });

        if (response.data.analysis) {
          setDreamAnalysis(response.data.analysis);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching dream analysis:', error);
      }
    };

    fetchDreamAnalysis();
  }, [dreamDiary, dreamDiary_id]);

  const createDreamAnalysis = useCallback(async () => {
    if (!dreamDiary_id) return;

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/analysis/new/${dreamDiary_id}`;
    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
        },
      });

      if (response.data.analysis) {
        setDreamAnalysis(response.data.analysis);
        setDreamDiary((prev) => (prev ? { ...prev, hasAnalysis: true } : prev));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating dream analysis:', error);
      alert('꿈 해몽 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [dreamDiary_id]);

  const deleteDreamDiary = useCallback(async () => {
    if (!dreamDiary_id) return;

    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dreams/delete/${dreamDiary_id}`;
    try {
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
        },
      });
      alert('꿈 일기가 삭제되었습니다.');
      router.replace('/(tabs)/diary');
    } catch (error) {
      console.error('Error deleting dream diary:', error);
      alert('꿈 일기 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [dreamDiary_id, router]);

  return (
    <BasicContainer>
      <Header title={dreamDiary ? dreamDiary.title : '꿈 일기 상세'} />
      {dreamDiary && (
        <BodyContainer>
          <DateText>
            {new Date(dreamDiary.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </DateText>
          <ContentText>{dreamDiary.content}</ContentText>
          {dreamDiary.emotion && (
            <EmotionContainer>
              <EmotionText>
                {dreamDiary.emotion}({dreamDiary.intensity})
              </EmotionText>
              <EmotionIntensitySlider
                value={dreamDiary.intensity || 1}
                disabled={true}
              />
            </EmotionContainer>
          )}
          <ButtonContainer>
            <EditButton
              onPress={() =>
                router.push(`/diary/edit?dream_id=${dreamDiary._id}`)
              }
            >
              <EditButtonText>수정하기</EditButtonText>
            </EditButton>
            <DeleteButton
              onPress={() => {
                Alert.alert(
                  '꿈 일기 삭제',
                  '정말 이 꿈 일기를 삭제하시겠습니까?',
                  [
                    { text: '취소', style: 'cancel' },
                    {
                      text: '삭제',
                      style: 'destructive',
                      onPress: deleteDreamDiary,
                    },
                  ]
                );
              }}
            >
              <DeleteButtonText>삭제하기</DeleteButtonText>
            </DeleteButton>
          </ButtonContainer>
          {!isLoading && (
            <>
              {dreamAnalysis ? (
                <DreamAnalysisContainer>
                  <DreamAnalysisTitle>
                    AI가 꿈을 분석했어요 ✨
                  </DreamAnalysisTitle>
                  <DreamAnalysisText>{dreamAnalysis}</DreamAnalysisText>
                </DreamAnalysisContainer>
              ) : (
                <GetDreamAnalysisButton
                  onPress={() => {
                    Alert.alert(
                      'AI 해몽하기',
                      'AI의 해몽을 받아올까요? (약간의 시간이 소요될 수 있어요)',
                      [
                        { text: '취소', style: 'cancel' },
                        {
                          text: '해몽하기',
                          style: 'destructive',
                          onPress: createDreamAnalysis,
                        },
                      ]
                    );
                  }}
                >
                  <GetDreamAnalysisButtonText>
                    AI 해몽하기
                  </GetDreamAnalysisButtonText>
                </GetDreamAnalysisButton>
              )}
            </>
          )}
          {isLoading && (
            <LoadingContainer>
              <MediumText style={{ color: colors.white }}>
                AI 해몽 불러오는 중...
              </MediumText>
              <ActivityIndicator color={colors.lightPurple} />
            </LoadingContainer>
          )}
        </BodyContainer>
      )}
    </BasicContainer>
  );
};

const BodyContainer = styled(ScrollView)`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

const ContentText = styled(BoldText)`
  margin-top: 8px;
  font-size: 18px;
  line-height: 28px;
  color: ${colors.white};
`;

const DateText = styled(MediumText)`
  color: ${colors.lightGray};
  font-size: 14px;
  line-height: 18px;
  text-align: right;
`;

const EmotionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  align-items: center;
`;

const EmotionText = styled(BoldText)`
  font-size: 24px;
  line-height: 28px;
  color: ${colors.white};
`;

const EmotionIntensitySlider = styled(Slider).attrs({
  minimumValue: 1,
  maximumValue: 10,
  step: 1,
  maximumTrackTintColor: colors.lightPurple,
  thumbTintColor: colors.white,
})`
  height: 40px;
  flex-grow: 1;
  margin-left: 4px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const EditButton = styled.Pressable`
  margin-top: 24px;
  background-color: ${colors.yellow};
  padding: 12px 20px;
  border-radius: 8px;
`;

const EditButtonText = styled(BoldText)`
  font-size: 18px;
  line-height: 20px;
  color: ${colors.black};
  text-align: center;
`;

const DeleteButton = styled.Pressable`
  margin-top: 24px;
  margin-left: 8px;
  background-color: ${colors.red};
  padding: 12px 20px;
  border-radius: 8px;
`;

const DeleteButtonText = styled(BoldText)`
  font-size: 18px;
  line-height: 20px;
  color: ${colors.white};
  text-align: center;
`;

const DreamAnalysisContainer = styled.View`
  margin-top: 24px;
`;

const DreamAnalysisTitle = styled(BoldText)`
  font-size: 20px;
  line-height: 24px;
  color: ${colors.yellow};
`;

const DreamAnalysisText = styled(BoldText)`
  margin: 16px 0;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.white};
`;

const GetDreamAnalysisButton = styled(BasicNextButton)`
  margin-top: 24px;
  margin-bottom: 16px;
  background-color: ${colors.lightPurple};
`;

const GetDreamAnalysisButtonText = styled(BasicNextButtonText)``;

const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

export default DreamDetail;
