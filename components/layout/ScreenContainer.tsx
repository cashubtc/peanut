import { View } from 'react-native';
import React from 'react';
import globalStyles from '../../globalStyles';

type ScreenContainerProps = {
  children: React.ReactNode
}

const ScreenContainer = ({ children }: ScreenContainerProps) => (
  <View style={globalStyles.screenContainer}>{children}</View>
);

export default ScreenContainer;
