import { Document, model, Schema } from 'mongoose';
import { Vote } from 'types/Vote';

interface VoteModel extends Vote, Document {}

const voteSchema: Schema = new Schema({
  org: { type: String, required: true },
  repo: { type: String, required: true },
  number: { type: Number, required: true },
  tokenAddress: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Date, required: true },
  closed: { type: Boolean, required: false, default: false },
});

export default model<VoteModel>('Vote', voteSchema);
