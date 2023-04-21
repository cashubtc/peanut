import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';
import { MainButton, TextContainer } from '../../../components';
import { decodeInvoice } from '../utils/lightning';
import { wallet } from '../../../mint';

const WalletConfirmScreen = ({ route }) => {
  const [amount, setAmount] = useState();
  const [fee, setFee] = useState();
  const [memo, setMemo] = useState();

  const insets = useSafeAreaInsets();

  const { invoice, address } = route.params || {};

  useEffect(() => {
    async function prep() {
      const { amount, memo } = decodeInvoice(invoice);
      setMemo(memo);
      setAmount(amount / 1000);
      const fee = await wallet.getFee(invoice);
      setFee(fee);
    }
    prep();
  }, []);

  return (
    <View
      style={[
        globalStyles.screenContainer,
        { justifyContent: 'space-between', paddingBottom: insets.bottom },
      ]}
    >
      <View style={{ width: '100%', flex: 1 }}>
        <Text
          style={[globalStyles.textBodyS, { width: '100%', textAlign: 'left' }]}
        >
          Paying
        </Text>
        <TextContainer text={`${amount} SATS`} />
        <Text
          style={[globalStyles.textBodyS, { width: '100%', textAlign: 'left' }]}
        >
          To
        </Text>
        <TextContainer text={address || `${invoice.slice(0,32)}...`} />
        <Text
          style={[globalStyles.textBodyS, { width: '100%', textAlign: 'left' }]}
        >
          Memo
        </Text>
        <TextContainer text={memo} />
        <Text
          style={[globalStyles.textBodyS, { width: '100%', textAlign: 'left' }]}
        >
          Fee
        </Text>
        <TextContainer text={`${fee} SATS`} />
        <Text
          style={[globalStyles.textBodyS, { width: '100%', textAlign: 'left' }]}
        >
          Total
        </Text>
        <TextContainer text={`${fee + amount} SATS`} />
      </View>
      <MainButton text="Confirm Payment" />
    </View>
  );
};

export default WalletConfirmScreen;
