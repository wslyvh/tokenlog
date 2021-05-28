import { Vote, VoteSummary } from 'src/types'
import { Repository } from './repository'

export interface VotingRepository extends Repository<Vote> {
  GetBacklogIds(type?: string): Promise<Array<string>>

  GetBacklogVotesAggregated(
    id: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<VoteSummary>>
  GetBacklogVotes(
    owner: string,
    repo: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<Vote>>
}
