import mongoose from 'mongoose'
import VoteModel from 'src/repository/models/VoteModel'
import { Vote } from 'src/types/Vote'
import { VoteSummary } from 'src/types/VoteSummary'
import { APP_CONFIG } from 'src/utils/config'
import { BaseRepository } from './base'
import { VotingRepository } from './interfaces/voting'

export class MongoVotingRepository
  extends BaseRepository<Vote>
  implements VotingRepository
{
  private connected: boolean

  constructor() {
    super('Vote')
    this.connected = false
  }

  protected async Connect(): Promise<void> {
    if (!this.connected) {
      await mongoose.connect(
        APP_CONFIG.DB_CONNECTIONSTRING,
        APP_CONFIG.DB_OPTIONS
      )
      this.connected = true
    }
  }

  public async GetBacklogIds(): Promise<Array<string>> {
    try {
      await this.Connect()

      return await VoteModel.find().distinct('backlog')
    } catch (ex) {
      console.error(ex)
      throw new Error(`Unable to get backlog ids.`)
    }
  }

  public async GetBacklogVotesAggregated(
    owner: string,
    repo: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<VoteSummary[]> {
    throw new Error('Method not implemented.')
  }

  public async GetBacklogVotes(
    owner: string,
    repo: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Vote[]> {
    throw new Error('Method not implemented.')
  }
}
