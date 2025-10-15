import AnalysisDreamModal from '@/components/home/AnlysisDreamModal';
import TodayDreamAnalysis from '@/components/home/TodayDreamAnalysis';
import TodayDreamDiary from '@/components/home/TodayDreamDiary';
import WriteDreamModal from '@/components/home/WriteDreamModal';
import { DreamDiaryType } from '@/types/dream';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const Home = () => {
  const [hasTodayDream, setHasTodayDream] = useState(false);
  const [todayDreamDiary, setTodayDreamDiary] = useState<DreamDiaryType | null>(
    null
  );

  const [isWriteDreamModalVisible, setIsWriteDreamModalVisible] =
    useState(true);
  const [isDreamAnalysisModalVisible, setIsDreamAnalysisModalVisible] =
    useState(false);

  const [hasDreamAnalysis, setHasDreamAnalysis] = useState(false);
  const [todayDreamAnalysis, setTodayDreamAnalysis] = useState<string | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dreams/getTodayDream`;
      const fetchTodayDream = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
            },
          });
          if (response.status === 200 && response.data) {
            setTodayDreamDiary(response.data.dreamDiary);
            setHasTodayDream(true);
            setIsWriteDreamModalVisible(false);
            if (response.data.dreamAnalysis) {
              setTodayDreamAnalysis(response.data.dreamAnalysis);
              setHasDreamAnalysis(true);
              setIsDreamAnalysisModalVisible(false);
            } else {
              setTodayDreamAnalysis(null);
              setHasDreamAnalysis(false);
              setIsDreamAnalysisModalVisible(true);
            }
          } else {
            setHasTodayDream(false);
            setIsWriteDreamModalVisible(true);
            setHasDreamAnalysis(false);
            setIsDreamAnalysisModalVisible(false);
            setTodayDreamDiary(null);
            setTodayDreamAnalysis(null);
          }
        } catch (error) {
          console.error('Error fetching today dream:', error);
        }
      };

      fetchTodayDream();
    }, [])
  );

  return (
    <BasicContainer>
      <ScrollView>
        {isWriteDreamModalVisible && !hasTodayDream && (
          <WriteDreamModal
            onClose={() => {
              setIsWriteDreamModalVisible(false);
            }}
          />
        )}
        {hasTodayDream && !hasDreamAnalysis && isDreamAnalysisModalVisible && (
          <AnalysisDreamModal
            onClose={() => {
              setIsDreamAnalysisModalVisible(false);
            }}
            dream_id={todayDreamDiary?._id!}
          />
        )}
        {hasTodayDream && <TodayDreamDiary todayDreamDiary={todayDreamDiary} />}
        {hasDreamAnalysis && (
          <TodayDreamAnalysis todayDreamAnalysis={todayDreamAnalysis} />
        )}
        {!hasTodayDream ? (
          <>
            <NoDreamImage
              source={require('@/assets/images/home-image.png')}
              resizeMode="contain"
            />
            <NoDreamTitle>
              어젯밤의 꿈이 사라지기 전에, 기록해볼까요?
            </NoDreamTitle>
          </>
        ) : null}
      </ScrollView>
    </BasicContainer>
  );
};

const ScrollView = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const NoDreamImage = styled.Image`
  width: 100%;
  height: ${Dimensions.get('window').width * (2 / 3)}px;
`;

const NoDreamTitle = styled(BoldText)`
  font-size: 24px;
  line-height: 38px;
  text-align: center;
  color: ${colors.white};
  margin-top: 32px;
`;

export default Home;
