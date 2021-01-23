import { Label } from './Label';
import { Vote } from './Vote';

export enum ItemState {
  OPEN,
  CLOSED,
}

export enum ItemType {
  ISSUE,
  PR,
}

export interface BacklogItem {
  id: number;
  number: number;
  title: string;
  body: string;
  state: ItemState;
  type: ItemType;
  created: Date;
  updated: Date;
  closed: Date;
  url: string;
  labels: Array<Label>;
  commentsCount: number;
  votes: Array<Vote>;
  voteCount: number;
}