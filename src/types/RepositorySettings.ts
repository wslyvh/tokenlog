import { Label } from './Label';

export enum Method {
  STANDARD = 'Standard voting',
  QUADRATIC = 'Quadratic voting',
  STAKING = 'Staking',
}

export interface RepositorySettings {
  org: string;
  repo: string;
  tokenAddress: string;
  labels: Array<Label>;
  method: Method;
}
