import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const ContainerScroll: React.FC = ({ children }) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ContainerScroll;
