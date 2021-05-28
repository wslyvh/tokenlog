import { Backlog, BacklogItem, Vote } from 'src/types'

export interface BacklogService {
  GetBacklog(id: string): Promise<Backlog>
  GetBacklogItems(id: string): Promise<Array<BacklogItem>>

  GetBacklogVotes(
    owner: string,
    id: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<Vote>>
}
