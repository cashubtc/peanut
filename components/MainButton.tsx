import { Text, Pressable, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import colors from '../colors';
import globalStyles from '../globalStyles';

type MainButtonProps = {
  text: string,
  onPress: (event: GestureResponderEvent) => void,
  containerStyles: ViewStyle,
  disabled: boolean | undefined,
  icon: keyof typeof Ionicons.glyphMap,
  loading: boolean | undefined
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.slate600,
    borderColor: colors.slate400,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.slate500,
  },
  containerDisabled: {
    backgroundColor: '#333333',
  },
  text: {
    textAlign: 'center',
  },
  textDisabled: {
    color: '#666666',
  },
});

const MainButton = ({ text, onPress, containerStyles, disabled, icon, loading }: MainButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.container,
      containerStyles,
      pressed ? styles.pressed : undefined,
      disabled ? styles.containerDisabled : undefined,
    ]}
    disabled={disabled}
  >
    {icon ? <Ionicons name={icon} /> : undefined}
    <Text style={globalStyles.textBodyBold}>{!loading ? text : 'Loading...'}</Text>
  </Pressable>
);

export default MainButton;
