import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { BaseProvider } from 'ethers/providers';

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export async function GetProvider(chainId?: number): Promise<BaseProvider> {
  switch (chainId) {
    case 1:
      return new ethers.providers.JsonRpcProvider(
        'https://eth-mainnet.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
      );
    case 3:
      return new ethers.providers.JsonRpcProvider(
        'https://eth-ropsten.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
      );
    case 4:
      return new ethers.providers.JsonRpcProvider(
        'https://eth-rinkeby.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
      );
    case 5:
      return new ethers.providers.JsonRpcProvider(
        'https://eth-goerli.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
      );
    case 42:
      return new ethers.providers.JsonRpcProvider('https://poa-kovan.gateway.pokt.network/v1/5f9180e3b90218002e9cea69');
    default:
      return new ethers.providers.JsonRpcProvider(
        'https://eth-mainnet.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
      );
  }
}

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
