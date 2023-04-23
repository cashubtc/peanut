import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletConfirmScreen, WalletSendScreen } from '../views';
import { SendStackParamList } from './types';

const Stack = createNativeStackNavigator<SendStackParamList>();

const WalletSendNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Destination" component={WalletSendScreen} />
    <Stack.Screen name="Confirm" component={WalletConfirmScreen} />
  </Stack.Navigator>
);

export default WalletSendNavigator;
