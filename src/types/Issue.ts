import { Label } from './Label';
import { Owner } from './Owner';

export interface Issue {
  id: number;
  number: number;
  title: string;
  description: string;
  state: string; // enum
  labels: Array<Label>;
  assignees: Array<Owner>;
  created: Date;
  updated: Date;
  url: string;
}
