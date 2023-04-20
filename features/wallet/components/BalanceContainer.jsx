import { View, Text } from 'react-native';
import React from 'react';
import globalStyles from '../../../globalStyles';
import useBalance from '../../proofs/hooks/useBalance';

const BalanceContainer = () => {
  const amount = useBalance();
  return (
    <View>
      <Text style={globalStyles.textH1}>
        {`${amount} `}
        <Text style={{ fontFamily: 'Satoshi-Symbol' }}>S</Text>
      </Text>
    </View>
  );
};

export default BalanceContainer;
