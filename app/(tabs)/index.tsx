import AnalysisDreamModal from '@/components/home/AnlysisDreamModal';
import TodayDreamAnalysis from '@/components/home/TodayDreamAnalysis';
import TodayDreamContainer from '@/components/home/TodayDreamRecord';
import WriteDreamModal from '@/components/home/WriteDreamModal';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

interface DreamRecord {
  date: Date;
  title: string;
  content: string;
}

export default function Home() {
  const [hasTodayDream, setHasTodayDream] = useState(true);
  const [todayDreamRecord, setTodayDreamRecord] = useState<DreamRecord | null>({
    date: new Date(),
    title: '숲속에서 만난 신비한 빛',
    content:
      '어젯밤 꿈에서 나는 깊은 숲속을 걷고 있었어요.\n길을 따라 걷다가 갑자기 나무 사이로 신비하게 빛나는 공간을 발견했어요.\n빛 안으로 들어가자 주변이 반짝이면서 작은 요정들이 나타났고, 나에게 말을 걸었어요.\n그들은 나에게 “용기를 내고 앞으로 나아가라”라고 속삭였어요.\n\n꿈을 깨고 나니 왠지 모르게 마음이 차분해지고 새로운 결심이 생겼어요.\n오늘 하루는 작은 도전이라도 시도해보고 싶다는 생각이 듭니다.',
  });

  const [isWriteDreamModalVisible, setIsWriteDreamModalVisible] =
    useState(true);
  const [isDreamAnalysisModalVisible, setIsDreamAnalysisModalVisible] =
    useState(true);

  const [hasDreamAnalysis, setHasDreamAnalysis] = useState(true);
  const [todayDreamAnalysis, setTodayDreamAnalysis] = useState<string | null>(
    '오늘의 꿈에서 나는 깊은 숲속을 걷고 있었습니다. 길을 따라 조용히 걸으면서 주변의 나무와 풀, 새소리 등 자연의 소소한 디테일을 느꼈고, 깊은 내면 속으로 들어가는 듯한 평온함과 약간의 긴장감을 동시에 경험했습니다. 숲은 단순한 배경이 아니라, 내 무의식과 내면 탐색을 상징하며, 현재 나 자신이 직면하고 있는 고민이나 해결해야 할 문제, 그리고 성장의 가능성을 보여주는 공간으로 해석할 수 있습니다.\n걷던 중 갑자기 나무 사이로 신비하게 빛나는 공간을 발견했습니다. 그 빛은 눈부시지만 부드럽게 마음을 감싸며, 마치 새로운 가능성과 깨달음을 알리는 신호처럼 느껴졌습니다. 빛은 삶에서 다가올 긍정적인 변화, 혹은 자신에게 필요한 통찰을 상징하며, 현실에서 놓치고 있던 직관이나 마음의 방향을 깨닫도록 안내하는 역할을 합니다.\n빛 속으로 들어가자 주변이 반짝이며 작은 요정들이 나타났습니다. 요정들은 친절하고 다정한 느낌으로 나에게 다가와, “용기를 내고 앞으로 나아가라”라고 속삭였습니다. 요정은 내면의 지혜, 직관, 그리고 긍정적 조언을 나타내며, 꿈에서 전달된 메시지는 단순한 환상이 아니라 실제로 현재 나에게 필요한 격려와 용기를 의미합니다. 이러한 상징을 통해 꿈은 내가 지금 내면의 힘을 인식하고, 앞으로의 도전에 자신감을 가지고 나아가야 한다는 것을 알려주고 있습니다.\n꿈을 깨고 나니 왠지 모르게 마음이 차분해지고, 새로운 결심이 생겼습니다. 이전에는 막연하게 느껴졌던 불안감이나 고민이, 꿈을 통해 내면에서 정리되고, 현실에서 작은 행동으로 옮길 힘과 동기를 얻은 느낌입니다. 오늘 하루 작은 도전이라도 시도해보고 싶다는 마음이 생겼다는 점에서, 이 꿈은 단순한 환상이 아니라 실제 생활에 적용 가능한 내적 메시지와 격려를 전달했다고 볼 수 있습니다.\n전반적으로 꿈의 분위기는 신비롭고 차분하며 몰입감이 있으며, 긍정적이고 희망적인 감정을 담고 있습니다. 숲과 빛, 요정과 속삭임, 걷는 행위 모두가 어우러져 현재 내면을 탐색하고, 자기 성찰과 성장, 그리고 앞으로 나아갈 용기를 상징합니다. 이러한 꿈은 자신이 직면한 문제나 도전을 긍정적인 시각에서 바라보고, 내면의 힘과 직관을 믿으며 행동하도록 격려하는 메시지를 담고 있습니다.'
  );

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
