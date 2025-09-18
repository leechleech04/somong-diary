import AnalysisDreamModal from '@/components/home/AnlysisDreamModal';
import TodayDreamAnalysis from '@/components/home/TodayDreamAnalysis';
import TodayDreamContainer from '@/components/home/TodayDreamRecord';
import WriteDreamModal from '@/components/home/WriteDreamModal';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { DreamRecord } from '@/types/dream';

export default function Home() {
  const [hasTodayDream, setHasTodayDream] = useState(false);
  const [todayDreamRecord, setTodayDreamRecord] = useState<DreamRecord | null>(
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

  useEffect(() => {
    // 오늘의 꿈, 해몽 가져오기, state 변경
  }, []);

  return (
    <Container>
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
      {hasTodayDream && (
        <TodayDreamContainer todayDreamRecord={todayDreamRecord} />
      )}
      {hasDreamAnalysis && (
        <TodayDreamAnalysis todayDreamAnalysis={todayDreamAnalysis} />
      )}
    </Container>
  );
}

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #000;
  padding: 0 24px;
`;
