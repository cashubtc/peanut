import { decode } from 'light-bolt11-decoder';
import { bolt11Regex } from '../../../regex';

export function decodeInvoice(invoice: string): {amount: number, memo: string} {
  if (!invoice.match(bolt11Regex)) {
    throw new Error('Not a valid lightning invoice');
  }
  const { sections = [] } = decode(invoice) || {};
  const [{ value: amount }] = sections.filter(
    (section) => section.name === 'amount',
  );
  const [{ value: memo }] = sections.filter(
    (section) => section.name === 'description',
  );
  return { amount, memo };
}

export function deconstructLnAddress(address) {
  if (!address.includes('@')) {
    throw new Error('Not a valid lightning address!');
  }
}
