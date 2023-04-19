import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import globalStyles from '../../../globalStyles';
import MainInput from '../../../components/MainInput';
import { CustomQRCode, MainButton } from '../../../components';
import { wallet } from '../../../mint';
import { addProofs } from '../../proofs/proofSlice';

const ReceiveAmount = ({ navigation }) => {
  const [paymentRequest, setpaymentRequest] = useState();
  const [paymentHash, setpaymentHash] = useState();
  const [amount, setAmount] = useState();
  const [width, setWidth] = useState();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const getInvoice = async () => {
    Keyboard.dismiss();
    const { pr, hash } = await wallet.requestMint(amount);
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
        const proofs = await wallet.requestTokens(amount, paymentHash);
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
          <MainInput onChangeText={setAmount} style={{ marginBottom: 12 }} />
          <MainButton onPress={getInvoice} text="Create Invoice" />
        </View>
        {width ? (
          <CustomQRCode value={paymentRequest} size={width} success={success} />
        ) : undefined}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReceiveAmount;
