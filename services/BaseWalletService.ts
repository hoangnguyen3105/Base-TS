import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';

export function isAddress(address: string) {
  try {
    return getAddress(address);
  } catch {
    return false;
  }
}

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || isNativeToken(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function isNativeToken(address: string) {
  return address === AddressZero;
}

export default class BaseWalletService {
  address: string | null;
  needTobeInitiated: any;
  initUnit256: any;

  constructor(props: any) {
    this.address = props?.address;
  }
}
