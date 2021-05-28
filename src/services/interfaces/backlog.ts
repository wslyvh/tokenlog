import { Backlog, BacklogItem, Vote } from 'src/types'

export interface BacklogService {
  GetBacklog(id: string): Promise<Backlog>

  GetBacklogItems(
    owner: string,
    id: string,
    type?: 'ISSUE' | 'PR',
    state?: 'OPEN' | 'CLOSED' | 'MERGED',
    sort?: 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS' | 'TOP',
    order?: 'ASC' | 'DESC',
    page?: number,
    size?: number
  ): Promise<Array<BacklogItem>>
  GetBacklogVotes(
    owner: string,
    id: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<Vote>>
}
