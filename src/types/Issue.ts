import { Label } from './Label';
import { Owner } from './Owner';
import { Vote } from './Vote';

export enum IssueState {
  ALL = 'all',
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum IssueType {
  ISSUE = 'issue',
  PR = 'pr',
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  description: string;
  state: IssueState;
  type: IssueType;
  labels: Array<Label>;
  assignees: Array<Owner>;
  created: Date;
  updated: Date;
  url: string;
  commentsCount: number;
  votes: Array<Vote>;
  voteCount: number;
}
