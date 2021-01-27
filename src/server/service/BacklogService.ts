import { Backlog, BacklogItem, Owner, Vote } from 'types/v2/';

export interface BacklogService {
  GetBacklogs(): Promise<Array<Backlog>>;
  GetOwner(owner: string): Promise<Owner>;
  GetBacklog(owner: string, id: string, inclFilters?: boolean): Promise<Backlog>;
  GetBacklogItems(owner: string, id: string): Promise<Array<BacklogItem>>;
  GetBacklogVotes(
    owner: string,
    id: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<Vote>>;
}
