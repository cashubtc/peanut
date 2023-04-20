import { TextInput } from 'react-native';
import React from 'react';
import colors from '../colors';

const MainInput = ({ onChangeText, style, placeholder, type }) => (
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
