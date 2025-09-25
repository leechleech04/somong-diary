import { colors } from '@/utils/colors';
import { BasicContainer, BoldText } from '@/utils/utilComponents';
import { useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

const Chart = () => {
  const [selectedDuration, setSelectedDuration] = useState<
    'week' | 'month' | 'year' | 'all'
  >('week');

  return (
    <BasicContainer>
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
      <PieChart
        data={[
          {
            name: 'React',
            population: 215,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Vue',
            population: 280,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Angular',
            population: 527,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
        ]}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={'population'} // 데이터 키 지정
        backgroundColor={'transparent'}
        paddingLeft={'15'}
      />
    </BasicContainer>
  );
};

const DurationContainer = styled.View`
  flex-direction: row;
  align-items: center;
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

export default Chart;
