import { Backlog } from './Backlog';
import { Token } from './Token';

export enum VotingMethod {
  STANDARD = 'Standard voting',
  QUADRATIC = 'Quadratic voting',
}

export interface BacklogSettings {
  backlog: Backlog;
  labels: Array<string>;
  token: Token;
  votingMethod: VotingMethod;
  chainId?: number;
  imageUrl?: string;
}
