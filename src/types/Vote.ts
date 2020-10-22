export interface Vote {
  org: string;
  repo: string;
  number: number;
  tokenAddress: string;
  address: string;
  amount: number;
  cost: number;
  signature: string;
  timestamp: Date;
}
