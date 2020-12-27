import React, { useRef, useState, useCallback } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';

import { GpsAnimation, SearchAnimation } from '~/assets/animations';
import { Button, ContainerScroll, MaskedInput } from '~/components';
import { usePosition } from '~/hooks/getPosition';
import api from '~/services/api';
import { getValidationErrors } from '~/utils/getValidationErrors';

import {
  Container,
  Touchable,
  Title,
  FormWrapper,
  Subtitle,
  Address,
} from './styles';

interface AddressProps {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

interface CoordsProps {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

const NewLocation: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { getUserManualPosition } = usePosition();
  const { goBack } = useNavigation();
  const [cepText, setCepText] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<AddressProps | null>(null);
  const [coords, setCoords] = useState<CoordsProps | null>(null);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      if (coords) {
        await getUserManualPosition(coords.latitude, coords.longitude);

        showMessage({
          type: 'success',
          message: 'Localização alterada com sucesso',
          titleStyle: {
            textAlign: 'center',
          },
        });

        goBack();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        showMessage({
          type: 'danger',
          message: 'CEP inválido',
          description: 'Tente novamente',
          titleStyle: {
            textAlign: 'center',
          },
          textStyle: {
            textAlign: 'center',
          },
        });
      }
    }
  }, [coords, getUserManualPosition, goBack]);

  const getAddressByZipcode = useCallback(async (text: string) => {
    setCepText(text);

    if (text.length === 9) {
      setAddress(null);

      const response = await api.get(`https://viacep.com.br/ws/${text}/json/`);

      if (response.data.logradouro) {
        console.log(response.data);

        setAddress(response.data);

        const location = await Location.geocodeAsync(
          `${response.data.logradouro}, ${response.data.localidade}`,
        );
        setCoords(location[0]);
        console.log(location[0]);
      } else {
        showMessage({
          type: 'warning',
          message: 'CEP não encontrado',
          description: 'Tente novamente',
          titleStyle: {
            textAlign: 'center',
          },
          textStyle: {
            textAlign: 'center',
          },
        });
      }
    }
  }, []);

  return (
    <Container>
      <Touchable onPress={() => goBack()}>
        <Ionicons name="ios-close-circle" size={40} color="#fff" />
      </Touchable>

      <Title>
        <Title style={{ fontFamily: 'Roboto_400Regular' }}>Alterar</Title>{' '}
        localização
      </Title>

      <ContainerScroll>
        <FormWrapper>
          <LottieView
            style={{ height: 80 }}
            source={GpsAnimation}
            autoPlay
            loop
          />

          <Subtitle>Por favor nos informe seu CEP:</Subtitle>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <MaskedInput
              name="address_zipcode"
              type="zip-code"
              placeholder="CEP"
              value={cepText}
              maxLength={9}
              onChangeText={(text) => {
                getAddressByZipcode(text);
              }}
              backgroundColor="#fff"
            />

            {address && cepText.length >= 9 && (
              <>
                <Address>
                  {address?.logradouro}, {address?.localidade} - {address?.uf}
                </Address>

                {loading ? (
                  <LottieView
                    style={{ height: 220, alignSelf: 'center' }}
                    source={SearchAnimation}
                    autoPlay
                    loop
                  />
                ) : (
                  <Button onPress={() => formRef.current?.submitForm()}>
                    Confirmar
                  </Button>
                )}
              </>
            )}
          </Form>
        </FormWrapper>
      </ContainerScroll>
    </Container>
  );
};

export default NewLocation;
