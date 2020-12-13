import {
  SunnyAnimation,
  CloudAnimation,
  ThunderAnimation,
  DrizzleAnimation,
  RainAnimation,
  SnowAnimation,
  FogAnimation,
} from '~/assets/animations';

const weatherIcon = {
  Clouds: CloudAnimation,
  Thunderstorm: ThunderAnimation,
  Drizzle: DrizzleAnimation,
  Rain: RainAnimation,
  Snow: SnowAnimation,
  Clear: SunnyAnimation,
  Mist: FogAnimation,
  Fog: FogAnimation,
};

export default weatherIcon;
