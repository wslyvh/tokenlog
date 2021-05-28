import { Backlog, BacklogItem, Vote } from 'src/types'

export interface BacklogService {
  GetBacklog(id: string): Promise<Backlog>
  GetBacklogItems(id: string): Promise<Array<BacklogItem>>
  GetBacklogVotes(id: string): Promise<Array<Vote>>
}
