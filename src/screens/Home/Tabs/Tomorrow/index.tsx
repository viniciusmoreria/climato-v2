import React from 'react';
import { FlatList } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Daily } from '~/models';
import weatherDailyIcon from '~/utils/getWeatherDailyIcon';

import { Container, WeatherCard, Hour, Temp } from './styles';

interface Props {
  data: Daily;
}

const Tomorrow: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      {/* <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item: Daily) => String(item.dt)}
        renderItem={({ item }) => ( */}
      <WeatherCard>
        <Hour key={data.dt}>
          {format(new Date(data.dt * 1000), 'HH', {
            locale: pt,
          })}
          h
        </Hour>

        <Ionicons
          name={weatherDailyIcon[data.weather[0].main]}
          size={22}
          color="#fff"
        />

        <Temp>{data.temp.day.toFixed(0)}°</Temp>
      </WeatherCard>
      {/* )} */}
      {/* /> */}
    </Container>
  );
};

export default Tomorrow;
