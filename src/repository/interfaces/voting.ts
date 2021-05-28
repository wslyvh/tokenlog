import { Vote, VoteSummary } from 'src/types'
import { Repository } from './repository'

export interface VotingRepository extends Repository<Vote> {
  GetBacklogIds(type?: string): Promise<Array<string>>
  GetBacklogVotesAggregated(id: string): Promise<Array<VoteSummary>>
  GetBacklogVotes(id: string): Promise<Array<Vote>>
}
