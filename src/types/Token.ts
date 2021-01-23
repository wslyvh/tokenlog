export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  totalSupply: number; // pulled in after login - not required to specify in settings
}
