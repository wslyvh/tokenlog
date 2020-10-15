import { Label } from './Label';
import { Owner } from './Owner';

export enum IssueState { 
  ALL = 'all',
  OPEN = 'open',
  CLOSED = 'closed'
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  description: string;
  state: IssueState;
  labels: Array<Label>;
  assignees: Array<Owner>;
  created: Date;
  updated: Date;
  url: string;
}
