import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';
import colors from '../../../colors';
import BalanceContainer from '../components/BalanceContainer';
import { Proof } from '@cashu/cashu-ts';
import { wallet } from '../../../mint';

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

const WalletHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const proofs = useSelector(state => state.proof.proofs)
  console.log(proofs)

  const payTest = async () => {
    const serProof = proofs.slice(-1)[0];
    const proof = new Proof(serProof.id, serProof.amount, serProof.secret, serProof.C)
    console.log(proof)
    const result = await wallet.payLnInvoice('lnbc10n1pjrlmdppp5rlk60yjvgdyhaskyj26swep7kdajxgllmnmxdz9se5wg7x49yrtsdqqcqzpuxqyz5vqsp5j8d6fngsy73ua2gh5pzxvn2zmfysv3dc9gghx73dp08eynjhyfpq9qyyssqsrqx3j9az2eenxywaetvll0s4xskt8hrwqv4eds86wsay2mh92k5espk6aypu57p7w9f3p7clug0txqtjeggp36fhnzs90l260tfemcpqvnd7r', [proof])
    console.log(result);
  };
  return (
    <View style={[globalStyles.screenContainer, { paddingHorizontal: 0 }]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BalanceContainer />
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
          onPress={payTest}
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

export default WalletHome;
