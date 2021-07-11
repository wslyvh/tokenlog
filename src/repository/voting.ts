import mongoose from 'mongoose'
import VoteModel from 'src/repository/models/VoteModel'
import { Vote } from 'src/types/Vote'
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

      return VoteModel.find().distinct('backlog')
    } catch (ex) {
      console.error(ex)
      throw new Error(`Unable to get backlog ids.`)
    }
  }

  public async GetBacklogVotes(id: string): Promise<Array<Vote>> {
    if (!id) throw new Error('id is empty or undefined.')

    try {
      await this.Connect()

      const models = await VoteModel.find({ backlog: id })
      return models.map(i => i.toObject())
    } catch (ex) {
      console.error(ex)

      throw new Error(`Unable to get backlog votes ${id}`)
    }
  }

  public async CloseVotes(id: string, numbers: Array<number>): Promise<void> {
    try {
      await this.Connect()

      const filter = { backlog: id.toLowerCase(), number: { $in: numbers } }
      const update = { state: 'CLOSED' }

      await VoteModel.updateMany(filter, update)
    } catch (ex) {
      console.error(ex)
    }
  }
}
