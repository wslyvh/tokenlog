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

      return VoteModel.find().distinct('backlog')
    } catch (ex) {
      console.error(ex)
      throw new Error(`Unable to get backlog ids.`)
    }
  }

  public async GetBacklogVotesAggregated(
    id: string
  ): Promise<Array<VoteSummary>> {
    if (!id) throw new Error('id is empty or undefined.')

    try {
      await this.Connect()

      const aggregated = await VoteModel.aggregate([
        { $match: { backlog: id } },
        {
          $group: {
            _id: { number: '$number' },
            number: { $first: '$number' },
            totalAmount: { $sum: '$amount' },
            voteCount: { $sum: 1 },
          },
        },
      ])

      return aggregated.map((i: any) => {
        return {
          number: i.number,
          totalAmount: i.totalAmount,
          voteCount: i.voteCount,
        } as VoteSummary
      })
    } catch (ex) {
      console.error(ex)

      throw new Error(`Unable to get backlog vote summaries ${id}`)
    }
  }

  public async GetBacklogVotes(id: string): Promise<Array<Vote>> {
    if (!id) throw new Error('id is empty or undefined.')

    try {
      await this.Connect()

      return VoteModel.find({ backlog: id })
    } catch (ex) {
      console.error(ex)

      throw new Error(`Unable to get backlog votes ${id}`)
    }
  }

  public async GetUserVotes(id: string, address: string): Promise<Array<Vote>> {
    if (!id) throw new Error('id is empty or undefined.')
    if (!address) throw new Error('address is empty or undefined.')

    try {
      await this.Connect()

      return VoteModel.find({
        backlog: id.toLowerCase(),
        address: address,
      })
    } catch (ex) {
      console.error(ex)

      throw new Error(`Unable to get user votes ${id}`)
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
