import { Vote } from 'src/types'
import { Repository } from './repository'

export interface VotingRepository extends Repository<Vote> {
  GetBacklogIds(type?: string): Promise<Array<string>>
  GetBacklogVotes(id: string): Promise<Array<Vote>>
}
