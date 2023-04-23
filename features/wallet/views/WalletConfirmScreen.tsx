import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import globalStyles from '../../../globalStyles';
import { MainButton, TextContainer } from '../../../components';
import { decodeInvoice } from '../utils/lightning';
import { wallet } from '../../../mint';
import { accumulateProofs } from '../../proofs/utils';
import { addProofs, removeProofs } from '../../proofs/proofSlice';
import { useProofs } from '../../proofs/hooks';
import type { SendStackParamList } from '../nav/types';
import { MainStackParamList } from '../../../nav/types';

type WalletConfirmScreenProps = CompositeScreenProps<
NativeStackScreenProps<SendStackParamList, 'Confirm'>,
NativeStackScreenProps<MainStackParamList>
>;

const WalletConfirmScreen = ({
  route,
  navigation,
}: WalletConfirmScreenProps) => {
  const [amount, setAmount] = useState<number | null>();
  const [fee, setFee] = useState<number | null>();
  const [memo, setMemo] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const proofs = useProofs();
  const dispatch = useDispatch();

  const { invoice, address } = route.params || {};

  useEffect(() => {
    async function prep() {
      const { amount: invoiceAmount, memo: invoiceMemo } = decodeInvoice(invoice);
      setMemo(invoiceMemo);
      setAmount(invoiceAmount / 1000);
      const mintFee = await wallet.getFee(invoice);
      setFee(mintFee);
    }
    prep();
  }, []);

  const sendHandler = async () => {
    setIsLoading(true);
    try {
      const total = amount + fee;
      const { base, exceeds } = accumulateProofs(proofs, total, 'middle');
      try {
        const spentProofs = [...base, exceeds];
        const { send, returnChange } = await wallet.send(total, spentProofs);
        const serSpentProofs = spentProofs.map((obj) => ({
          C: obj.C,
          amount: obj.amount,
          id: obj.id,
          secret: obj.secret,
        }));
        const serChangeProofs = returnChange.map((obj) => ({
          C: obj.C,
          amount: obj.amount,
          id: obj.id,
          secret: obj.secret,
        }));
        dispatch(removeProofs(serSpentProofs));
        dispatch(addProofs(serChangeProofs));
        try {
          const { isPaid } = await wallet.payLnInvoice(invoice, send);
          if (isPaid) {
            navigation.navigate('WalletHome');
          }
        } catch (e) {
          console.log(
            'Invoice Payment failed... Adding proofs back to store',
            e,
          );
          const serFailedProofs = send.map((obj) => ({
            C: obj.C,
            amount: obj.amount,
            id: obj.id,
            secret: obj.secret,
          }));
          dispatch(addProofs(serFailedProofs));
        }
      } catch (e) {
        console.log('Splitting failed:', e);
      }
    } catch (e) {
      console.log('Accumulation failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

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
        <TextContainer text={address || `${invoice.slice(0, 32)}...`} />
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
      <MainButton
        text="Confirm Payment"
        onPress={sendHandler}
        loading={isLoading}
      />
    </View>
  );
};

export default WalletConfirmScreen;
