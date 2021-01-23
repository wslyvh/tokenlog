import { Token } from './Token';

export enum VotingMethod {
  STANDARD,
  QUADRATIC
}

export interface BacklogSettings {
  votingMethod: VotingMethod;
  tokens: Array<Token>;
  labels: Array<string>;
}
