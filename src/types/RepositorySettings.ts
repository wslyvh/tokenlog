import { Label } from './Label';

export interface RepositorySettings {
  id?: number;
  org: string;
  repo: string;
  owner: string;
  tokenAddress: string;
  labels: Array<Label>;
  method: string;
  timePeriod: number;
}
