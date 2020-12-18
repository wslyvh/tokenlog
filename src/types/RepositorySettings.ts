import { Token } from './Token';

export enum VotingMethod {
  STANDARD = 'Standard voting',
  QUADRATIC = 'Quadratic voting',
}

export interface RepositorySettings {
  org: string;
  repo: string;
  labels: Array<string>;
  tokenAddress: string;
  token?: Token;
  votingMethod?: VotingMethod;
  chainId?: number;
  imageUrl?: string;
}
