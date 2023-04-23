import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  WalletHomeScreen,
  WalletReceiveScreen,
} from '../features/wallet/views';
import colors from '../colors';
import { WalletSendNavigator } from '../features/wallet';
import globalStyles from '../globalStyles';
import type { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.slate600 },
      headerTitleStyle: globalStyles.textBodyBold,
    }}
  >
    <Stack.Screen
      name="WalletHome"
      component={WalletHomeScreen}
      options={{
        headerTitle: "Let's go nuts!",
      }}
    />
    <Stack.Screen
      name="WalletReceive"
      component={WalletReceiveScreen}
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen
      name="WalletSend"
      component={WalletSendNavigator}
      options={{ presentation: 'modal', headerTitle: 'Want some nuts?!' }}
    />
  </Stack.Navigator>
);

export default MainNav;
