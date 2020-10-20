import { Token } from './Token';

export enum Method {
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
