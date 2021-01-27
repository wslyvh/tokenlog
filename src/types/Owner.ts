import { Backlog } from './v2/Backlog';

export enum OwnerType {
  USER = 'User',
  ORGANIZATION = 'Organization',
}

export interface Owner {
  id: string;
  name: string;
  type: OwnerType;
  url: string;
  avatarUrl: string;
  backlogs: Array<Backlog>;
}
