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
export function GetNetworkName(chainId: number): string {
  switch (chainId) {
    case 1:
      return 'homestead';
    case 3:
      return 'ropsten';
    case 4:
      return 'rinkeby';
    case 5:
      return 'goerli';
    case 42:
      return 'kovan';
  }

  return 'homestead';
}
