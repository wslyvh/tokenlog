export interface VotingPower {
  totalPower: number;
  voted: number;
  available: number;
  totalSupply: number;
  tokenBalances?: any; // used for multiple tokens to track individual token balances
}
