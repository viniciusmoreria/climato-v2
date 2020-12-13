import { Current, Daily, Hourly } from '~/models';

export default interface Weather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  hourly: Hourly[];
  daily: Daily[];
}
