import React from 'react';
import { View } from 'react-native';
import { Dimensions } from 'react-native';

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import { Hourly } from '~/models';

import { Container, Temp } from './styles';

const { height, width } = Dimensions.get('window');

interface Props {
  data: Hourly[];
}

const Today: React.FC<Props> = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: '#F7F7FA',
    backgroundGradientTo: '#F7F7FA',
    color: () => '#5873FC',
    labelColor: () => `#65737E`,
    propsForBackgroundLines: {
      strokeWidth: 0.7,
    },
  };

  const chartData = {
    labels: [
      'Agora',
      ...data?.slice(1, 24).map((item) =>
        format(new Date(item.dt * 1000), "HH'h'", {
          locale: pt,
        }),
      ),
    ],
    datasets: [
      {
        data: data?.slice(0, 24).map((item) => item.temp.toFixed(0)),
        color: () => `#D9D7FC`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LineChart
          data={chartData}
          width={width * Math.round(data?.slice(0, 24).length / 6.5)}
          height={height * 0.26}
          chartConfig={chartConfig}
          withHorizontalLines={false}
          withHorizontalLabels={false}
          getDotColor={(value, index) => (index === 0 ? '#827CFC' : '#5873FC')}
          renderDotContent={({ x, y, index }) => {
            return (
              <View
                key={Number(index)}
                style={{
                  height: 24,
                  width: 24,
                  position: 'absolute',
                  top: y - 25,
                  left: x - 7,
                }}
              >
                <Temp>{chartData?.datasets[0].data[index]}°</Temp>
              </View>
            );
          }}
          style={{
            marginLeft: -35,
            marginTop: 6,
          }}
        />
      </ScrollView>
    </Container>
  );
};

export default Today;
