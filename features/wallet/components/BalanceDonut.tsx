import {
  Canvas,
  Skia,
  Text,
  runTiming,
  useFont,
  useValue,
} from '@shopify/react-native-skia';
import React, { FC, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import BalanceDonutPath from './BalanceDonutPath';
import { useAppSelector } from '../../../store/types';

type BalanceDonutProps = {
  radius: number;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const STROKE_WIDTH = 20;

const BalanceDonut: FC<BalanceDonutProps> = ({ radius }) => {
  const animationState = useValue(0);
  const proofs = useAppSelector((state) => state.proof.proofs);
  const balances = proofs.map((proof) => proof.amount).sort((a, b) => a - b);

  const animationDonut = () => {
    animationState.current = 0;

    runTiming(animationState, 1, {
      duration: 500,
    });
  };

  useEffect(() => {
    animationDonut();
  }, [proofs]);

  const innerRadius = radius - STROKE_WIDTH / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const total = balances.reduce((a, c) => a + c, 0);
  const targetText = `${total} SATS`;
  const font = useFont(require('../../../assets/Montserrat-Bold.ttf'), 32);

  if (!font) {
    return <View />;
  }
  const textWidth = font.getTextWidth(targetText);

  return (
    <View style={style.container}>
      <Canvas style={style.container}>
        {balances.map((amount, index) => {
          const current =
            balances.slice(0, index).reduce((a, c) => a + c, 0) / total;
          return (
            <BalanceDonutPath
              path={path}
              opacity={(1 / balances.length) * (index + 1)}
              strokeWidth={STROKE_WIDTH}
              current={current}
              percentageComplete={animationState}
              total={total}
              amount={amount}
            />
          );
        })}
        <Text
          x={innerRadius - textWidth / 2}
          font={font}
          y={radius + STROKE_WIDTH}
          text={targetText}
          opacity={animationState}
          color="white"
        />
      </Canvas>
    </View>
  );
};

export default BalanceDonut;
