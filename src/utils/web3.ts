import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { BaseProvider } from 'ethers/providers';

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 100, 137],
});

export async function GetProvider(chainId?: number): Promise<BaseProvider> {
  switch (chainId) {
    case 100:
      return new ethers.providers.JsonRpcProvider('https://rpc.gnosischain.com/');

    case 137:
      return new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');

    default:
      return ethers.getDefaultProvider(GetNetworkName(chainId ?? 1));
  }

  // switch (chainId) {
  //   case 1:
  //     return new ethers.providers.JsonRpcProvider(
  //       'https://eth-mainnet.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
  //     );
  //   case 3:
  //     return new ethers.providers.JsonRpcProvider(
  //       'https://eth-ropsten.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
  //     );
  //   case 4:
  //     return new ethers.providers.JsonRpcProvider(
  //       'https://eth-rinkeby.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
  //     );
  //   case 5:
  //     return new ethers.providers.JsonRpcProvider(
  //       'https://eth-goerli.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
  //     );
  //   case 42:
  //     return new ethers.providers.JsonRpcProvider('https://poa-kovan.gateway.pokt.network/v1/5f9180e3b90218002e9cea69');
  //   case 100:
  //     return new ethers.providers.JsonRpcProvider('https://rpc.gnosischain.com/');
  //   default:
  //     return new ethers.providers.JsonRpcProvider(
  //       'https://eth-mainnet.gateway.pokt.network/v1/5f9180e3b90218002e9cea69'
  //     );
  // }
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
    case 100:
      return 'xdai';
    case 137:
      return 'polygon';
  }

  return 'homestead';
}

export function GetNetworkColor(network: string): string {
  switch (network) {
    case 'ropsten':
      return 'danger';
    case 'kovan':
      return 'primary';
    case 'rinkeby':
      return 'warning';
    case 'goerli':
      return 'dark';
    case 'xdai':
      return 'light';
    case 'polygon':
      return 'light';
  }

  return 'info';
}

export function GetEtherscanLink(address: string, chainId: number, type: 'address' | 'token' = 'address'): string {
  switch (chainId) {
    case 3:
      return `https://ropsten.etherscan.io/${type}/${address}`;
    case 4:
      return `https://rinkeby.etherscan.io/${type}/${address}`;
    case 5:
      return `https://goerli.etherscan.io/${type}/${address}`;
    case 42:
      return `https://kovan.etherscan.io/${type}/${address}`;
    case 100:
      if (type === 'token') return `https://blockscout.com/poa/xdai/tokens/${address}`;
      if (type === 'address') return `https://blockscout.com/poa/xdai/address/${address}`;
      break;
    case 137:
      if (type === 'token') return `https://polygonscan.com/token/${address}`
      if (type === 'address') return `https://polygonscan.com/address/${address}`
      break;
  }

  return `https://www.etherscan.io/${type}/${address}`;
}
