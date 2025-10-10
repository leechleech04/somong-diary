import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import { useCallback, useEffect, useState } from 'react';
import { BarChart, PieChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';

import { getAccessTokenFromMemory } from '@/utils/authToken';
import emotions from '@/utils/emotions';
import axios from 'axios';
import { ActivityIndicator, Dimensions } from 'react-native';

const Chart = () => {
  const [selectedDuration, setSelectedDuration] = useState<
    'week' | 'month' | 'year' | 'all'
  >('week');

  const [loading, setLoading] = useState(false);

  interface emotionDataType {
    emotion: string;
    intensity: number;
    date: Date;
  }

  interface pieChartDataType {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  }

  interface barChartDataType {
    labels: string[];
    datasets: { data: number[] }[];
  }

  const [pieChartData, setPieChartData] = useState<pieChartDataType[]>([]);
  const [barChartData, setBarChartData] = useState<barChartDataType>({
    labels: [],
    datasets: [{ data: [] }],
  });

  const parseEmotionDataToPieChartData = useCallback(
    (data: emotionDataType[]) => {
      const emotionCountMap: { [key: string]: number } = {};

      data.forEach((entry) => {
        if (emotionCountMap[entry.emotion]) {
          emotionCountMap[entry.emotion] += 1;
        } else {
          emotionCountMap[entry.emotion] = 1;
        }
      });

      const pieData: pieChartDataType[] = Object.keys(emotionCountMap).map(
        (emotion, index) => ({
          name: `${emotion} ${
            emotions.find((e) => e.name === emotion)?.emoji || ''
          }`,
          population: emotionCountMap[emotion],
          color:
            emotions.find((e) => e.name === emotion)?.color || colors.black,
          legendFontColor: colors.white,
          legendFontSize: 16,
        })
      );

      pieData.sort((a, b) => b.population - a.population);

      setPieChartData(pieData);
    },
    []
  );

  const parseEmotionDataToBarChartData = useCallback(
    (data: emotionDataType[]) => {
      const emotionIntensityMap: { [key: string]: number[] } = {};

      data.forEach((entry) => {
        if (emotionIntensityMap[entry.emotion]) {
          emotionIntensityMap[entry.emotion].push(entry.intensity);
        } else {
          emotionIntensityMap[entry.emotion] = [entry.intensity];
        }
      });

      const labels = Object.keys(emotionIntensityMap);
      const intensities = labels.map((emotion) => {
        const intensities = emotionIntensityMap[emotion];
        const totalIntensity = intensities.reduce((sum, val) => sum + val, 0);
        return totalIntensity;
      });

      const barData: barChartDataType = {
        labels: labels.map(
          (emotion) =>
            `${emotion} ${
              emotions.find((e) => e.name === emotion)?.emoji || ''
            }`
        ),
        datasets: [
          {
            data: intensities,
          },
        ],
      };

      setBarChartData(barData);
    },
    []
  );

  useEffect(() => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}`;
    const fetchWeeklyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/charts/weekly`, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        });

        if (response.status === 200 && response.data) {
          parseEmotionDataToPieChartData(response.data.emotionList);
          parseEmotionDataToBarChartData(response.data.emotionList);
        }
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/charts/monthly`, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        });

        if (response.status === 200 && response.data) {
          parseEmotionDataToPieChartData(response.data.emotionList);
          parseEmotionDataToBarChartData(response.data.emotionList);
        }
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchYearlyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/charts/yearly`, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        });

        if (response.status === 200 && response.data) {
          parseEmotionDataToPieChartData(response.data.emotionList);
          parseEmotionDataToBarChartData(response.data.emotionList);
        }
      } catch (error) {
        console.error('Error fetching yearly data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/charts/all`, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
          },
        });

        if (response.status === 200 && response.data) {
          parseEmotionDataToPieChartData(response.data.emotionList);
          parseEmotionDataToBarChartData(response.data.emotionList);
        }
      } catch (error) {
        console.error('Error fetching all data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDuration === 'week') {
      fetchWeeklyData();
    } else if (selectedDuration === 'month') {
      fetchMonthlyData();
    } else if (selectedDuration === 'year') {
      fetchYearlyData();
    } else if (selectedDuration === 'all') {
      fetchAllData();
    }
  }, [selectedDuration]);

  return (
    <BasicContainer>
      <ScrollContainer>
        <DurationContainer>
          <DurationButton
            isSelected={selectedDuration === 'week'}
            onPress={() => setSelectedDuration('week')}
          >
            <DurationButtonText isSelected={selectedDuration === 'week'}>
              주
            </DurationButtonText>
          </DurationButton>
          <DurationButton
            isSelected={selectedDuration === 'month'}
            onPress={() => setSelectedDuration('month')}
          >
            <DurationButtonText isSelected={selectedDuration === 'month'}>
              월
            </DurationButtonText>
          </DurationButton>
          <DurationButton
            isSelected={selectedDuration === 'year'}
            onPress={() => setSelectedDuration('year')}
          >
            <DurationButtonText isSelected={selectedDuration === 'year'}>
              년
            </DurationButtonText>
          </DurationButton>
          <DurationButton
            isSelected={selectedDuration === 'all'}
            onPress={() => setSelectedDuration('all')}
          >
            <DurationButtonText isSelected={selectedDuration === 'all'}>
              전체
            </DurationButtonText>
          </DurationButton>
        </DurationContainer>
        <ChartTitle>감정 빈도 분포</ChartTitle>
        {loading ? (
          <ActivityIndicator color={colors.lightPurple} />
        ) : (
          <Pie
            data={pieChartData}
            width={Dimensions.get('window').width - 48}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'0'}
            hasLegend={false}
            center={[Dimensions.get('window').width / 4, 0]}
          />
        )}
        <LegendScrollView>
          <LegendContainer>
            {pieChartData.map((item, index) => (
              <LegendItem key={index}>
                <LegendColorBox style={{ backgroundColor: item.color }} />
                <LegendText>{item.name}</LegendText>
                <LegendText>
                  (
                  {(
                    (item.population /
                      pieChartData.reduce(
                        (sum, item) => sum + item.population,
                        0
                      )) *
                    100
                  ).toFixed(1)}
                  %)
                </LegendText>
              </LegendItem>
            ))}
          </LegendContainer>
        </LegendScrollView>
        <ChartTitle>감정 강도 그래프</ChartTitle>
        <BarScrollView horizontal>
          <BarChart
            data={barChartData}
            width={Math.max(
              Dimensions.get('window').width - 48,
              barChartData.labels.length * 70
            )}
            height={320}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: colors.backgroundPurple,
              backgroundGradientTo: colors.backgroundPurple,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />
        </BarScrollView>
      </ScrollContainer>
    </BasicContainer>
  );
};

const DurationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ScrollContainer = styled.ScrollView.attrs({
  nestedScrollEnabled: true,
})`
  width: 100%;
  flex: 1;
`;

const DurationButton = styled.Pressable<{ isSelected: boolean }>`
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? colors.lightPurple : colors.white};
  margin-right: 12px;
`;

const DurationButtonText = styled(BoldText)<{ isSelected: boolean }>`
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? colors.white : colors.black};
  font-size: 16px;
  line-height: 18px;
`;

const ChartTitle = styled(BoldText)`
  margin-top: 24px;
  color: ${colors.white};
  font-size: 24px;
  line-height: 26px;
`;

const Pie = styled(PieChart)``;

const LegendScrollView = styled.ScrollView.attrs({
  nestedScrollEnabled: true,
})`
  height: 120px;
  width: 100%;
  border: 2px solid ${colors.gray};
  border-radius: 12px;
`;

const LegendContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 8px;
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 8px;
  width: 45%;
`;

const LegendColorBox = styled.View`
  width: 12px;
  height: 12px;
  margin-right: 6px;
  border-radius: 3px;
`;

const LegendText = styled.Text`
  color: ${colors.white};
  font-size: 14px;
  margin-right: 4px;
`;

const BarScrollView = styled.ScrollView.attrs({
  nestedScrollEnabled: true,
})`
  width: 100%;
  margin-top: 16px;
`;

export default Chart;
