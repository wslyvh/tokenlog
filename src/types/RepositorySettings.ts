import { Token } from './Token';

export enum VotingMethod {
  STANDARD = 'Standard voting',
  QUADRATIC = 'Quadratic voting',
  STAKING = 'Staking',
}

export interface RepositorySettings {
  org: string;
  repo: string;
  tokenAddress: string;
  labels: Array<string>;
  token?: Token;
}
