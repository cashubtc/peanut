import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import globalStyles from '../../../globalStyles';
import MainInput from '../../../components/MainInput';
import { CustomQRCode, MainButton } from '../../../components';
import { wallet } from '../../../mint';
import { addProofs } from '../../proofs/proofSlice';
import { MainStackParamList } from '../../../nav/types';
import { useAppDispatch } from '../../../store/types';

type WalletReceiveScreenProps = NativeStackScreenProps<MainStackParamList, 'WalletReceive'>;

const WalletReceiveScreen = ({ navigation }: WalletReceiveScreenProps) => {
  const [paymentRequest, setpaymentRequest] = useState<string | null>();
  const [paymentHash, setpaymentHash] = useState<string | null>();
  const [amount, setAmount] = useState<string | null>();
  const [width, setWidth] = useState<number | null>();
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const getInvoice = async () => {
    Keyboard.dismiss();
    const { pr, hash } = await wallet.requestMint(Number(amount));
    setpaymentRequest(pr);
    setpaymentHash(hash);
  };

  const onLayout = (e) => {
    const viewWidth = e.nativeEvent.layout.width;
    setWidth(viewWidth);
  };

  useEffect(() => {
    let interval;
    async function getToken() {
      try {
        const proofs = await wallet.requestTokens(Number(amount), paymentHash);
        try {
          clearInterval(interval);
          setSuccess(true);
          const serObjs = proofs.map((obj) => ({
            C: obj.C,
            amount: obj.amount,
            id: obj.id,
            secret: obj.secret,
          }));
          dispatch(addProofs(serObjs));
          setTimeout(() => {
            navigation.navigate('WalletHome');
          }, 1000);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (paymentHash) {
      interval = setInterval(getToken, 3000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [paymentHash]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={[
          globalStyles.screenContainer,
          { justifyContent: 'space-evenly' },
        ]}
        onLayout={onLayout}
      >
        <View style={{ width: '80%' }}>
          <MainInput
            onChangeText={setAmount}
            style={{ marginBottom: 12 }}
            type="numeric"
            placeholder="Amount in SATS"
          />
          <MainButton onPress={getInvoice} text="Create Invoice" />
        </View>
        {width ? (
          <CustomQRCode value={paymentRequest} size={width} success={success} />
        ) : undefined}
      </View>
    </KeyboardAvoidingView>
  );
};

export default WalletReceiveScreen;
