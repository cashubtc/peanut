import { KeyboardTypeOptions, TextInput, TextStyle, ViewStyle } from 'react-native';
import React from 'react';
import colors from '../colors';

type MainInputProps = {
  onChangeText: (text: string) => void,
  style: TextStyle | ViewStyle,
  placeholder: string,
  type: KeyboardTypeOptions
};

const MainInput = ({ onChangeText, style, placeholder, type }: MainInputProps) => (
  <TextInput
    style={[
      {
        width: '100%',
        backgroundColor: colors.slate600,
        fontSize: 32,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        textAlign: 'center',
        color: colors.slate100,
      },
      style,
    ]}
    placeholder={placeholder}
    keyboardType={type}
    onChangeText={onChangeText}
  />
);

export default MainInput;
