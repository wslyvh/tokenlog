import { Label } from './Label';
import { Vote } from './Vote';

export interface BacklogItem {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'OPEN' | 'CLOSED';
  type: 'ISSUE' | 'PR';
  created: Date;
  updated: Date;
  closed: Date;
  url: string;
  labels: Array<Label>;
  commentsCount: number;
  votes: Array<Vote>;
  voteCount: number;
}
