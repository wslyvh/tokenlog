export interface Vote {
  org: string;
  repo: string;
  number: number;
  address: string;
  amount: number;
  signature: string;
  timestamp: Date;
}
