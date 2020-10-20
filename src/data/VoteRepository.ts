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
}

export default VoteRepository;
