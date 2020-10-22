import { DbConfig } from 'config/Db';
import mongoose from 'mongoose';
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
}

export default VoteRepository;
