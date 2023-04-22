import { useAppSelector } from '../../../store/types';

const useBalance = () => {
  const proofs = useAppSelector((state) => state.proof.proofs);
  const amount = proofs.reduce((a, c) => a + c.amount, 0);
  return amount;
};

export default useBalance;
