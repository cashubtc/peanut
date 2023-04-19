import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import globalStyles from '../../../globalStyles';

const BalanceContainer = () => {
  const proofs = useSelector((state) => state.proof.proofs);
  const amount = proofs.reduce((a, c) => a + c.amount, 0);
  return (
    <View>
      <Text style={globalStyles.textH1}>{amount} <Text style={{fontFamily: 'Satoshi-Symbol'}}>S</Text></Text>
    </View>
  );
};

export default BalanceContainer;
