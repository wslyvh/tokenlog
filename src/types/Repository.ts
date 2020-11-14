import { Owner } from './Owner';

export enum RepositoryType {
  ALL = 'all',
  PUBLIC = 'public',
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  archived: boolean;
  owner: Owner;
  created: Date;
  updated: Date;
  url: string;
  homepage: string;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssueCount: number;
}

export interface OrgRepo {
  org: string;
  repo: string;
}
