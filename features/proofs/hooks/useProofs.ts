import { Proof } from '@cashu/cashu-ts';
import { useAppSelector } from '../../../store/types';

const useProofs = () => {
  const serProofs = useAppSelector((state) => state.proof.proofs);
  const proofs = serProofs.map(serProof => new Proof(serProof.id, serProof.amount, serProof.secret, serProof.C))
  return proofs
};

export default useProofs;