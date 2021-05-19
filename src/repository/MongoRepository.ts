import mongoose from 'mongoose'
import VoteModel from 'src/models/VoteModel'
import { SERVER_CONFIG } from 'src/utils/config'
import { DB_OPTIONS } from 'src/utils/db'
import { Backlog, Vote, VoteSummary } from 'src/types'
import { VotingRepository } from './VotingRepository'

export class MongoRepository implements VotingRepository {
  private connected: boolean

  constructor() {
    this.connected = false
  }

  protected async Connect(): Promise<void> {
    if (!this.connected) {
      await mongoose.connect(SERVER_CONFIG.DB_CONNECTIONSTRING, DB_OPTIONS)
      this.connected = true
    }
  }

  public async GetBacklogs(): Promise<Array<Backlog>> {
    try {
      await this.Connect()

      const aggregated = await VoteModel.aggregate([
        {
          $group: {
            _id: { org: '$org', repo: '$repo' },
          },
        },
      ])

      return aggregated.map((i) => {
        return {
          ownerName: i._id.org,
          id: i._id.repo,
        } as Backlog
      })
    } catch (ex) {
      console.error(ex)

      throw new Error(`Unable to get repositories`)
    }
  }

  public async GetBacklogVotesAggregated(
    owner: string,
    repo: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<VoteSummary>> {
    if (!owner || !repo) throw new Error('Properties are empty or undefined.')

    try {
      await this.Connect()

      const filter = this.getFilter(owner, repo, state, address, numbers)

      // console.log("AGGREGATE VOTE SUMMARY", filter);
      const aggregated = await VoteModel.aggregate([
        { $match: filter },
        {
          $group: {
            _id: { org: '$org', repo: '$repo', number: '$number' },
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

      throw new Error(`Unable to get vote summaries ${owner}/${repo}`)
    }
  }

  public async GetBacklogVotes(
    owner: string,
    repo: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<Vote>> {
    if (!owner || !repo) throw new Error('Properties are empty or undefined.')

    try {
      await this.Connect()

      const filter = this.getFilter(owner, repo, state, address, numbers)

      // console.log("QUERY VOTES", filter);
      const models = await VoteModel.find(filter)

      return models.map((i: any) => {
        return {
          number: i.number,
          state: i.closed ? 'CLOSED' : 'OPEN', // TODO: i.state
          address: i.address,
          amount: i.amount,
          signature: i.signature,
          date: i.timestamp,
        } as Vote
      })
    } catch (ex) {
      console.error(ex)

      throw new Error(`Unable to get votes ${owner}/${repo}`)
    }
  }

  private getFilter(
    owner: string,
    repo: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): any {
    let filter: any = { org: owner, repo: repo }
    if (state === 'OPEN' || state === 'CLOSED')
      filter = { ...filter, closed: state === 'CLOSED' } // TODO: replace with .state === filter
    if (address) filter = { ...filter, address: address }
    if (numbers && numbers.length > 0)
      filter = { ...filter, number: { $in: numbers } }

    return filter
  }
}
