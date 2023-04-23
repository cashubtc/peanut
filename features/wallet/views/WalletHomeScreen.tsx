import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import globalStyles from '../../../globalStyles';
import colors from '../../../colors';
import BalanceContainer from '../components/BalanceContainer';
import { MainStackParamList } from '../../../nav/types';
import BalanceDonut from '../components/BalanceDonut';

type WalletHomeScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'WalletHome'>;
};

const styles = StyleSheet.create({
  mainButton: {
    flex: 1,
    backgroundColor: colors.slate700,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  mainButtonActive: {
    backgroundColor: colors.slate500,
  },
});

const WalletHomeScreen = ({ navigation }: WalletHomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const device = useWindowDimensions();

  return (
    <View style={[globalStyles.screenContainer, { paddingHorizontal: 0 }]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BalanceContainer />
        <View style={{ width: device.width - 50, height: device.width - 50 }}>
          <BalanceDonut radius={(device.width - 50) / 2} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: colors.slate700,
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            paddingBottom: insets.bottom,
          }}
          onPress={() => {
            navigation.navigate('WalletSend');
          }}
        >
          <Text style={globalStyles.textBody}>Send</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.mainButton,
            { paddingBottom: insets.bottom },
            pressed ? styles.mainButtonActive : undefined,
          ]}
          onPress={() => {
            navigation.navigate('WalletReceive');
          }}
        >
          <Text style={globalStyles.textBody}>Receive</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WalletHomeScreen;