import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletHome from '../features/wallet/views/WalletHome';
import { ReceiveScreen } from '../features/wallet/views';
import colors from '../colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {backgroundColor: colors.slate600},
      headerTitle: ''
    }}>
      <Stack.Screen name="WalletHome" component={WalletHome}/>
      <Stack.Screen name="WalletReceive" component={ReceiveScreen} options={{presentation: 'modal', headerTitle: 'Gimme Nuts'}}/>
    </Stack.Navigator>
  );
};

export default MainNav;
