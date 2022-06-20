import { Token } from './Token';

export enum VotingMethod {
  STANDARD = 'Standard voting',
  QUADRATIC = 'Quadratic voting',
}

export interface RepositorySettings {
  org: string;
  repo: string;
  labels: Array<string>;
  tokenAddresses?: Array<string>;
  tokenAddress: string;
  tokens?: Array<Token>;
  token?: Token;
  votingMethod?: VotingMethod;
  chainId?: number;
  imageUrl?: string;
  getTokenMessage?: string;
  getTokenLink?: string;
}
