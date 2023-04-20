import { View, Text, Pressable, StyleSheet, Button } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';
import colors from '../../../colors';
import BalanceContainer from '../components/BalanceContainer';
import { useSelector } from 'react-redux';
import { accumulateProofs } from '../../proofs/utils/accumulateProofs';
import { Proof } from '@cashu/cashu-ts';

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

const WalletHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const proofs = useSelector((state) => state.proof.proofs);
  // const payTest = async () => {
  //   const serProof = proofs.slice(-1)[0];
  //   const proof = new Proof(
  //     serProof.id,
  //     serProof.amount,
  //     serProof.secret,
  //     serProof.C
  //   );
  //   console.log(proof);
  //   const result = await wallet.payLnInvoice(
  //     '',
  //     [proof]
  //   );
  //   console.log(result);
  // };
  return (
    <View style={[globalStyles.screenContainer, { paddingHorizontal: 0 }]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BalanceContainer />
        <Button
          title="Test"
          onPress={() => {
            const classProofs = proofs.map(
              (proof) => new Proof(proof.id, proof.amount, proof.secret, proof.C),
            );
            console.log(proofs)
            const toBeUsed = accumulateProofs(classProofs, 49, 'descending');
            console.log(toBeUsed);
          }}
        />
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
