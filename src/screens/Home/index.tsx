/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { Animated } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
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

import NextDays from '../NextDays';
import Today from './Today';

const Home: React.FC = () => {
  const { address, weatherData } = usePosition();
  const [opacity] = useState(new Animated.Value(0));
  const [currentHour] = useState(new Date().getHours());

  const currentDetails = useMemo(
    () => [
      {
        id: 1,
        question: 'Vento',
        answer: `${(weatherData.current.wind_speed * (60 * 60)) / 1000} km/h`,
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

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity, address]);

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

            <AntDesign
              name="down"
              size={18}
              color="black"
              style={{ marginLeft: 5 }}
            />
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

        <NextDays data={weatherData.daily} />
      </Container>
    </Animated.View>
  );
};

export default Home;
