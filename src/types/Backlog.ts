import { Owner } from './Owner';

export interface Backlog {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string;
  owner?: Owner;
}
