import { Proof } from '@cashu/cashu-ts';

function accumulateProofs(
  proofs: Proof[],
  requiredAmount: number,
  strategy: 'middle' | 'ascending' | 'descending',
) {
  const result: Proof[] = [];
  const temp = proofs.slice().sort((a, b) => a.amount - b.amount);
  let total = 0;
  switch (strategy) {
    case 'middle': {
      while (temp.length && total < requiredAmount) {
        const first = temp.shift();
        total += first!.amount;
        result.push(first!);
        if (total >= requiredAmount) {
          break;
        }
        const last = temp.pop();
        total += last!.amount;
        result.push(last!);
      }
      break;
    }
    case 'ascending': {
      for (let i = 0; i < temp.length; i += 1) {
        total += temp[i].amount;
        result.push(temp[i]);
        if (total >= requiredAmount) {
          break;
        }
      }
      break;
    }
    case 'descending': {
      for (let i = 0; i < temp.length; i += 1) {
        total += temp[temp.length - (1 + i)].amount;
        result.push(temp[temp.length - (1 + i)]);
        if (total >= requiredAmount) {
          break;
        }
      }
      break;
    }
    default: {
      throw new Error('No valid strategy was provided');
    }
  }
  return {
    base: result.slice(0, -1),
    exceeds: result[result.length - 1],
    excess: total - requiredAmount,
  };
}

export default accumulateProofs;
