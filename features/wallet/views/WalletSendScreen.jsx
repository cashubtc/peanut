import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';
import { MainButton, MainInput } from '../../../components';
import { decodeInvoice } from '../utils/lightning';
import useBalance from '../../proofs/hooks/useBalance';

const SendScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState();
  const [viewHeight, setViewHeight] = useState();

  const balance = useBalance();
  const insets = useSafeAreaInsets();
  const device = useWindowDimensions();

  useEffect(() => {
    setError();
    let timer;
    if (input.length > 0) {
      timer = setTimeout(() => {
        try {
          const { amount } = decodeInvoice(input);
          console.log(amount);
          if (amount / 1000 > balance) {
            throw new Error('Amount exceeds balance!');
          }
        } catch (e) {
          setError(e);
        }
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  // const send = async () => {
  //   const { amount } = decodeInvoice(input);
  //   const fee = await wallet.getFee(input);
  //   const { send: toSend, returnChange } = await wallet.send((amount / 1000) + fee, proofs);
  //   await wallet.payLnInvoice(input, toSend);
  // };

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
      }}
    >
      <KeyboardAvoidingView
        style={[
          globalStyles.screenContainer,
          { justifyContent: 'space-between', paddingBottom: insets.bottom },
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={device.height - viewHeight}
      >
        <View style={{ width: '100%', flex: 1 }}>
          <View
            style={{ width: '100%', alignItems: 'flex-start', marginBottom: 6 }}
          >
            <Text style={globalStyles.textBodyS}>
              Invoice / Lightning Address
            </Text>
          </View>
          <MainInput onChangeText={setInput} />
          {error ? (
            <Text style={globalStyles.textBodyError}>{error.message}</Text>
          ) : undefined}
        </View>
        <MainButton
          text="Next"
          onPress={() => {
            navigation.navigate('Confirm', { invoice: input });
          }}
        />
        <View style={{ height: insets.bottom }} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default SendScreen;
