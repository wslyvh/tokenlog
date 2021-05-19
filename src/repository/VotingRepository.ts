import { Backlog, Vote, VoteSummary } from 'src/types'

export interface VotingRepository {
  GetBacklogs(): Promise<Array<Backlog>>
  GetBacklogVotesAggregated(
    owner: string,
    repo: string,
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
