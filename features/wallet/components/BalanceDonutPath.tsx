/* eslint-disable react/style-prop-object */
import React from 'react';
import { Path, useComputedValue, useValue } from '@shopify/react-native-skia';

const BalanceDonutPath = ({
  path,
  strokeWidth,
  current,
  percentageComplete,
  total,
  amount,
  opacity,
}) => {
  const skiaCurrent = useValue(current);
  skiaCurrent.current = current;
  const test = useComputedValue(
    () => percentageComplete.current * (skiaCurrent.current + amount / total),
    [percentageComplete, skiaCurrent],
  );
  // console.log(round)
  return (
    <Path
      path={path}
      color="white"
      opacity={opacity}
      style="stroke"
      strokeWidth={strokeWidth}
      strokeCap="butt"
      start={current}
      end={test}
    />
  );
};

export default BalanceDonutPath;
