import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import QRCode from 'react-qr-code';
import { Ionicons } from '@expo/vector-icons';
import colors from '../colors';
import globalStyles from '../globalStyles';

type CustomQRCodeProps = {
  size: number | undefined,
  value: string | undefined,
  success: boolean | undefined
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.slate100,
    borderRadius: 10,
  },
  containerPlaceholder: {
    padding: 12,
    backgroundColor: colors.slate700,
    borderRadius: 10,
  },
});

const CustomQRCode = ({ size, value, success }: CustomQRCodeProps) => (
  <View
    style={[
      value ? styles.container : styles.containerPlaceholder,
      { width: size - 40, height: size - 40, justifyContent: 'center', alignItems: 'center' },
    ]}
  >
    {value ? (
      <QRCode size={size - 64} value={value} bgColor={colors.slate100} />
    ) : (
      <Text style={globalStyles.textBody}>Create an Invoice...</Text>
    )}
    {success ? (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.slate700,
          borderRadius: 10,
        }}
      >
        <Ionicons
          name="checkmark-circle"
          size={size / 2}
          color={colors.slate600}
          containerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        />
      </View>
    ) : undefined}
  </View>
);

export default CustomQRCode;
