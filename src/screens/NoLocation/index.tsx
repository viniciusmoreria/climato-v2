import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Keyboard } from 'react-native';

import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';

import { GpsAnimation } from '~/assets/animations';
import { Button, MaskedInput } from '~/components';
import { usePosition } from '~/hooks/getPosition';
import api from '~/services/api';
import { getValidationErrors } from '~/utils/getValidationErrors';

import { Container, Title, Subtitle, FormWrapper, Address } from './styles';

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

const NoLocation: React.FC = () => {
  const { hasPosition, getUserManualPosition } = usePosition();
  const formRef = useRef<FormHandles>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [keyboard, setKeyboard] = useState(false);
  const [cepText, setCepText] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<AddressProps | null>(null);
  const [coords, setCoords] = useState<CoordsProps | null>(null);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const regexCEP = /\d{5}[-\s]?\d{3}/g;

        const schema = Yup.object().shape({
          cep: Yup.string().matches(regexCEP),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (coords) {
          await getUserManualPosition(coords.latitude, coords.longitude);
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
    },
    [coords, getUserManualPosition],
  );

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

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapTo(index);
  }, []);

  const keyboardDidShow = useCallback(() => {
    setKeyboard(true);
  }, []);

  const keyboardDidHide = useCallback(() => {
    setKeyboard(false);
  }, []);

  useEffect(() => {
    if (!hasPosition) {
      setTimeout(() => {
        handleSnapPress(1);
      }, 1000);
    }

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, [handleSnapPress, hasPosition, keyboardDidHide, keyboardDidShow]);

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
      snapPoints={['4%', keyboard ? '80%' : '60%']}
      enableHandlePanningGesture
      backdropComponent={renderBackdrop}
    >
      <Container>
        <Title>
          {address && cepText.length >= 9
            ? 'Encontramos sua localização!'
            : 'Não encontramos sua localização'}
        </Title>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 25,
          }}
        >
          <LottieView
            style={{ height: 80 }}
            source={GpsAnimation}
            autoPlay
            loop
          />

          <Subtitle>
            Para lhe oferecer uma melhor experiência, por favor nos informe seu
            CEP:
          </Subtitle>

          <FormWrapper>
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
              />

              {address && cepText.length >= 9 && (
                <>
                  <Address>
                    {address?.logradouro}, {address?.localidade} - {address?.uf}
                  </Address>

                  <Button onPress={() => formRef.current?.submitForm()}>
                    Confirmar
                  </Button>
                </>
              )}
            </Form>
          </FormWrapper>
        </BottomSheetScrollView>
      </Container>
    </BottomSheet>
  );
};

export default NoLocation;
