import { DbConfig } from 'config/Db';
import mongoose from 'mongoose';
import { OrgRepoIssue } from 'types/Issue';
import { OrgRepo } from 'types/Repository';
import { Vote } from 'types/Vote';
import VoteModel from './models/VoteModel';

const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

class VoteRepository {
  private connected: boolean;

  constructor() {
    this.connected = false;
  }

  public async Connect(): Promise<void> {
    if (!this.connected) {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);
      this.connected = true;
    }
  }

  async CreateVote(vote: Vote): Promise<Vote | undefined> {
    try {
      await this.Connect();

      return await VoteModel.create(vote);
    } catch (ex) {
      console.error(ex);
    }
  }

  async CloseVote(org: string, repo: string, number: number): Promise<void> {
    try {
      await this.Connect();

      const filter = { org: org.toLowerCase(), repo: repo.toLowerCase(), number: number };
      const update = { closed: true };

      await VoteModel.updateMany(filter, update);
    } catch (ex) {
      console.error(ex);
    }
  }

  async GetVotes(org: string, repo: string): Promise<Array<Vote>> {
    try {
      await this.Connect();

      return await VoteModel.find({ org: org.toLowerCase(), repo: repo.toLowerCase() });
    } catch (ex) {
      console.error(ex);
    }

    return [];
  }

  async GetUserVotes(org: string, repo: string, address: string): Promise<number> {
    try {
      await this.Connect();

      const result = await VoteModel.aggregate([
        { $match: { org: org.toLowerCase(), repo: repo.toLowerCase(), address: address } },
        { $group: { _id: null, cost: { $sum: '$cost' } } },
      ]);

      return result.length > 0 ? result[0].cost : 0;
    } catch (ex) {
      console.error(ex);
    }

    return 0;
  }

  async GetReposWithVotes(): Promise<Array<OrgRepo>> {
    try {
      await this.Connect();

      const aggr = await VoteModel.aggregate([{ $group: { _id: { org: '$org', repo: '$repo' } } }]);

      return aggr.map((i) => {
        return { org: i._id.org, repo: i._id.repo };
      });
    } catch (ex) {
      console.error(ex);
    }

    return [];
  }

  async GetRepoIssuesWithVotes(): Promise<Array<OrgRepoIssue>> {
    try {
      await this.Connect();

      const open = await VoteModel.aggregate([
        { $match: { closed: { $ne: true } } },
        { $group: { _id: { org: '$org', repo: '$repo', number: '$number' } } },
      ]);

      return open.map((i) => {
        return { org: i._id.org, repo: i._id.repo, number: i._id.number };
      });
    } catch (ex) {
      console.error(ex);
    }

    return [];
  }
}

export default VoteRepository;
