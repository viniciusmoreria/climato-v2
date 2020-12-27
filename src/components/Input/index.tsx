import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  placeholderTextColor?: string;
  multiline?: boolean;
}

interface IInputValueReference {
  value: string;
}

const Input: React.FC<IInputProps> = ({
  name,
  placeholderTextColor,
  multiline,
  ...rest
}) => {
  const inputElementRef = useRef(null);
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue });

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        placeholderTextColor={placeholderTextColor ?? '#999999'}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        multiline={multiline}
        {...rest}
      />
    </Container>
  );
};

export default Input;
