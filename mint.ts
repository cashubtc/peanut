/* eslint-disable import/no-mutable-exports */
import { CashuMint, CashuWallet } from '@cashu/cashu-ts';

export const MINTURL = 'https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC';
export let wallet: CashuWallet;
export const mint = new CashuMint(MINTURL);

export async function initWallet() {
  const keys = await mint.getKeys();
  wallet = new CashuWallet(keys, mint);
}
