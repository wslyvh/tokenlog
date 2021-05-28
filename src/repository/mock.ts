import { Vote } from 'src/types/Vote'
import { VoteSummary } from 'src/types/VoteSummary'
import { BaseRepository } from './base'
import { VotingRepository } from './interfaces/voting'

export class MockRepository
  extends BaseRepository<Vote>
  implements VotingRepository
{
  constructor() {
    super('Vote')
  }

  public async GetBacklogIds(): Promise<Array<string>> {
    return ['github:wslyvh/tokenlog']
  }

  public async GetBacklogVotesAggregated(id: string): Promise<VoteSummary[]> {
    throw new Error('Method not implemented.')
  }

  public async GetBacklogVotes(id: string): Promise<Array<Vote>> {
    throw new Error('Method not implemented.')
  }
}
