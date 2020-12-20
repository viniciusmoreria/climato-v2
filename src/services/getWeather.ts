// eslint-disable-next-line import/no-unresolved
import { WEATHER_API } from '@env';

import { Weather } from '~/models';

import api from './api';

export async function getWeather(lat: number, lng: number): Promise<Weather> {
  const response = await api.get(
    `/onecall?lat=${lat}&lon=${lng}&exclude=minutely&&units=metric&appid=${WEATHER_API}`,
  );

  return response.data;
}
