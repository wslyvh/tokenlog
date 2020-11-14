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
  async CreateVote(vote: Vote): Promise<Vote | undefined> {
    try {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);

      return await VoteModel.create(vote);
    } catch (ex) {
      console.error(ex);
    } finally {
      await mongoose.disconnect();
    }
  }

  async CloseVote(org: string, repo: string, number: number): Promise<void> {
    try {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);

      const filter = { org: org, repo: repo, number: number };
      const update = { closed: true };

      await VoteModel.findOneAndUpdate(filter, update, { new: true });
    } catch (ex) {
      console.error(ex);
    } finally {
      await mongoose.disconnect();
    }
  }

  async GetVotes(org: string, repo: string): Promise<Array<Vote>> {
    try {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);

      return await VoteModel.find({ org: org, repo: repo });
    } catch (ex) {
      console.error(ex);
    } finally {
      await mongoose.disconnect();
    }

    return [];
  }

  async GetUserVotes(org: string, repo: string, address: string): Promise<number> {
    try {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);
      const result = await VoteModel.aggregate([
        { $match: { org: org, repo: repo, address: address } },
        { $group: { _id: null, cost: { $sum: '$cost' } } },
      ]);

      return result.length > 0 ? result[0].cost : 0;
    } catch (ex) {
      console.error(ex);
    } finally {
      await mongoose.disconnect();
    }

    return 0;
  }

  async GetReposWithVotes(): Promise<Array<OrgRepo>> {
    try {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);

      const aggr = await VoteModel.aggregate([{ $group: { _id: { org: '$org', repo: '$repo' } } }]);

      return aggr.map((i) => {
        return { org: i._id.org, repo: i._id.repo };
      });
    } catch (ex) {
      console.error(ex);
    } finally {
      await mongoose.disconnect();
    }

    return [];
  }

  async GetRepoIssuesWithVotes(): Promise<Array<OrgRepoIssue>> {
    try {
      await mongoose.connect(DbConfig.DB_CONNECTIONSTRING, dbOptions);

      const open = await VoteModel.aggregate([
        { $match: { closed: { $ne: true } } },
        { $group: { _id: { org: '$org', repo: '$repo', number: '$number' } } },
      ]);

      return open.map((i) => {
        return { org: i._id.org, repo: i._id.repo, number: i._id.number };
      });
    } catch (ex) {
      console.error(ex);
    } finally {
      await mongoose.disconnect();
    }

    return [];
  }
}

export default VoteRepository;
