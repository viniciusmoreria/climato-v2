/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef } from 'react';
import { Alert, Platform, View } from 'react-native';

// eslint-disable-next-line import/no-unresolved
import { GOOGLE_API } from '@env';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { style } from './styles';

interface Props {
  setField: any;
}

const GoogleSearch: React.FC<Props> = ({ setField }) => {
  const ref = useRef(null);

  const requestAuthorization = useCallback(async () => {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Precisamos de autorização para exibir a previsão do tempo de forma detalhada.',
      );
      return null;
    }

    console.log('granted');
    return 'granted';
  }, []);

  useEffect(() => {
    requestAuthorization();
  }, [requestAuthorization]);

  return (
    <View>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Pesquisar endereço"
        enablePoweredByContainer
        minLength={6}
        onPress={async (data, details) => {
          let fullAdress = null;

          const { lat } = details.geometry.location;
          const { lng } = details.geometry.location;

          const address = await Location.reverseGeocodeAsync({
            latitude: lat,
            longitude: lng,
          });

          fullAdress = {
            city:
              Platform.OS === 'android'
                ? address[0].subregion
                : address[0].city,
            neighborhood: address[0].district,
            street: address[0].street,
            country: address[0].country,
            name: address[0].name,
          };

          console.log(fullAdress);
          await setField(fullAdress);
        }}
        query={{
          key: GOOGLE_API,
          language: 'pt-BR',
          components: 'country:br',
        }}
        styles={style}
      />
    </View>
  );
};

export default GoogleSearch;
