import { Label } from './Label';
import { Owner } from './Owner';
import { Vote } from './Vote';

export enum ItemState {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum ItemType {
  ISSUE = 'issue',
  PR = 'pr',
}

export interface BacklogItem {
  id: number;
  number: number;
  title: string;
  description: string;
  state: ItemState;
  type: ItemType;
  labels: Array<Label>;
  assignees: Array<Owner>;
  created: Date;
  updated: Date;
  url: string;
  votes: Array<Vote>;
  voteCount: number;
}