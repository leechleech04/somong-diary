import AnalysisDreamModal from '@/components/home/AnlysisDreamModal';
import TodayDreamAnalysis from '@/components/home/TodayDreamAnalysis';
import TodayDreamDiary from '@/components/home/TodayDreamDiary';
import WriteDreamModal from '@/components/home/WriteDreamModal';
import { DreamDiary } from '@/types/dream';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { BasicContainer } from '@/utils/utilComponents';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export default function Home() {
  const [hasTodayDream, setHasTodayDream] = useState(false);
  const [todayDreamDiary, setTodayDreamDiary] = useState<DreamDiary | null>(
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
              setIsDreamAnalysisModalVisible(true);
            }
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
        />
      )}
      {hasTodayDream && <TodayDreamDiary todayDreamDiary={todayDreamDiary} />}
      {hasDreamAnalysis && (
        <TodayDreamAnalysis todayDreamAnalysis={todayDreamAnalysis} />
      )}
    </BasicContainer>
  );
}
