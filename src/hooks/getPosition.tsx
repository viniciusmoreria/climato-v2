/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { Platform } from 'react-native';

import * as Location from 'expo-location';

import { convertStates } from '~/utils/convertStates';

interface PositionContextData {
  loading: boolean;
  address: AddressProps | undefined;
  getUserPosition(): Promise<any>;
}

interface AddressProps {
  state?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  country?: string | null;
  name?: string | null;
  lat?: number;
  lng?: number;
  district?: string | null;
  region?: string | null;
  subregion?: string | null;
  postalCode?: string | null;
  isoCountryCode?: string | null;
  timezone?: string | null;
}

const PositionContext = createContext<PositionContextData>(
  {} as PositionContextData,
);

export const PositionProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<AddressProps>();

  const getUserPosition = useCallback(async () => {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    if (location !== null) {
      const pos = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      const userAddress = await Location.reverseGeocodeAsync({
        latitude: pos.lat,
        longitude: pos.lng,
      });

      const addressData = {
        state:
          userAddress[0].region &&
          (Platform.OS === 'ios'
            ? convertStates(userAddress[0].region)
            : userAddress[0].region),

        city:
          Platform.OS === 'android'
            ? userAddress[0].subregion
            : userAddress[0].city,
        neighborhood: userAddress[0].district,
        street: userAddress[0].street,
        country: userAddress[0].country,
        name:
          Platform.OS === 'android'
            ? `${userAddress[0].street} - ${userAddress[0].name}`
            : userAddress[0].name,
        lat: pos.lat,
        lng: pos.lng,
      };

      setAddress(addressData);
      console.log(addressData);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getUserPosition();
  }, [getUserPosition]);

  return (
    <PositionContext.Provider
      value={{
        loading,
        address,
        getUserPosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export function usePosition(): PositionContextData {
  const context = useContext(PositionContext);

  return context;
}
