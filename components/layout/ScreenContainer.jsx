import { View } from 'react-native';
import React from 'react';
import globalStyles from '../../globalStyles';

const ScreenContainer = ({ children }) => (
  <View style={globalStyles.screenContainer}>{children}</View>
);

export default ScreenContainer;
