/* eslint-disable no-nested-ternary */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Animated, View, Text } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';

import { BackgroundImage } from '~/assets/images';
import { ContainerScroll } from '~/components';
import { usePosition } from '~/hooks/getPosition';
import weatherDescription from '~/utils/getWeatherDescription';
import weatherIcon from '~/utils/getWeatherIcon';

import {
  Container,
  LocationContainer,
  City,
  State,
  CurrentDate,
  WeatherContainer,
  WeatherWrapper,
  WeatherTemp,
  WeatherDescription,
  TempFeelsLike,
  WeatherDetailsCard,
  WeatherDetailsTitle,
  WeatherDetailsDescription,
  WeatherDetailsHolder,
} from './styles';

import { Today } from './Tabs';

const Home: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { address, weatherData } = usePosition();
  const [opacity] = useState(new Animated.Value(0));
  const [currentHour] = useState(new Date().getHours());

  const currentDetails = useMemo(
    () => [
      {
        id: 1,
        question: 'Vento',
        answer: `${weatherData.current.wind_speed} km/h`,
      },
      {
        id: 2,
        question: 'Umidade',
        answer: `${weatherData.current.humidity}%`,
      },
      {
        id: 3,
        question: 'Visibilidade',
        answer: `${weatherData.current.visibility / 1000} km`,
      },
    ],
    [weatherData],
  );

  const weatherDetailsMemo = useMemo(
    () =>
      currentDetails.map((item) => (
        <WeatherDetailsHolder key={item.id}>
          <WeatherDetailsTitle>{item.question}</WeatherDetailsTitle>

          <WeatherDetailsDescription>{item.answer}</WeatherDetailsDescription>
        </WeatherDetailsHolder>
      )),
    [currentDetails],
  );

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapTo(index);
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      handleSnapPress(1);
    }, 1000);

    setTimeout(() => {
      handleSnapPress(0);
    }, 3000);
  }, [opacity, address, handleSnapPress]);

  const snapPoints = useMemo(() => ['3%', '50%'], []);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity,
      }}
    >
      <Container>
        <ContainerScroll>
          <LocationContainer>
            <City>{address?.city}, </City>

            <State>{address?.state}</State>
          </LocationContainer>

          <WeatherContainer source={BackgroundImage}>
            <WeatherWrapper>
              <LottieView
                style={{ height: 100 }}
                source={weatherIcon[weatherData.current.weather[0].main]}
                autoPlay
                loop
              />

              <WeatherDescription>
                {weatherDescription[weatherData.current.weather[0].main]}
              </WeatherDescription>

              <CurrentDate>
                {currentHour < 12
                  ? 'Manhã'
                  : currentHour < 18
                  ? 'Tarde'
                  : 'Noite'}
              </CurrentDate>
            </WeatherWrapper>

            <WeatherWrapper>
              <WeatherTemp>{weatherData.current.temp.toFixed(0)}°</WeatherTemp>

              <TempFeelsLike>
                Sensação de {weatherData.current.feels_like.toFixed(0)}°
              </TempFeelsLike>
            </WeatherWrapper>
          </WeatherContainer>

          <WeatherDetailsCard>{weatherDetailsMemo}</WeatherDetailsCard>

          <Today data={weatherData.hourly} />
        </ContainerScroll>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enableHandlePanningGesture
        >
          <View
            style={{
              flex: 1,
              padding: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>🎉</Text>
          </View>
        </BottomSheet>
      </Container>
    </Animated.View>
  );
};

export default Home;
