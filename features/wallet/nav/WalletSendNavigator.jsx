import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletSendScreen } from '../views';

const Stack = createNativeStackNavigator();

const WalletSendNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Amount" component={WalletSendScreen} />
  </Stack.Navigator>
);

export default WalletSendNavigator;
