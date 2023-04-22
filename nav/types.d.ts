import { NavigatorScreenParams } from '@react-navigation/native';
import { SendStackParamList } from '../features/wallet/nav/types';

export type MainStackParamList = {
  WalletHome: undefined;
  WalletReceive: undefined;
  WalletSend: NavigatorScreenParams<SendStackParamList>;
};
