import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export function isValidAddress(address: string) {
  try {
    ethers.utils.getAddress(address);

    return true;
  } catch (e) {
    return false;
  }
}
