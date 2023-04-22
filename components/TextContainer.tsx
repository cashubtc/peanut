import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../colors';
import globalStyles from '../globalStyles';

type TextContainerProps = {
  text: string
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: colors.slate700,
    borderRadius: 4,
  },
});

const TextContainer = ({ text }: TextContainerProps) => (
  <View style={styles.container}>
    <Text style={globalStyles.textBodyBold}>{text}</Text>
  </View>
);

export default TextContainer;
