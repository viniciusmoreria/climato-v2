import React, { useRef, useEffect, useCallback } from 'react';

import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Daily } from '~/models';
import {
  weatherDailyIcon,
  weatherDailyIconColor,
} from '~/utils/getWeatherDailyIcon';

import { Container, WeatherCard, Title, Wrapper, Hour, Temp } from './styles';

interface Props {
  data: Daily[];
}

const NextDays: React.FC<Props> = ({ data }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapTo(index);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleSnapPress(1);
    }, 1000);

    setTimeout(() => {
      handleSnapPress(0);
    }, 3000);
  }, [handleSnapPress]);

  const renderItem = useCallback(
    (item: Daily) => (
      <WeatherCard key={item.dt}>
        <Hour>
          {format(new Date(item.dt * 1000), 'EEEE', {
            locale: pt,
          })}
        </Hour>

        <Wrapper>
          <Ionicons
            name={weatherDailyIcon[item.weather[0].main]}
            size={22}
            color={weatherDailyIconColor[item.weather[0].main]}
          />

          <Temp>{item.temp.day.toFixed(0)}°</Temp>
        </Wrapper>
      </WeatherCard>
    ),
    [],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} enableTouchThrough closeOnPress={false} />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={['4%', '55%']}
      enableHandlePanningGesture
      backdropComponent={renderBackdrop}
    >
      <Container>
        <Title>Próximos 7 dias</Title>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="never"
        >
          {data.slice(1, 8).map(renderItem)}
        </BottomSheetScrollView>
      </Container>
    </BottomSheet>
  );
};

export default NextDays;
