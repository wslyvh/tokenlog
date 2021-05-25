import { Document, Model, model, models, Schema } from 'mongoose'
import { OldVote } from 'src/types/OldVote'

interface OldVoteModel extends OldVote, Document {}

const voteSchema: Schema = new Schema({
  org: { type: String, required: true, lowercase: true, trim: true },
  repo: { type: String, required: true, lowercase: true, trim: true },
  number: { type: Number, required: true },
  tokenAddress: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Date, required: true },
  closed: { type: Boolean, required: false, default: false },
})

export default (models.Vote
  ? models.Vote
  : model<OldVoteModel>('Vote', voteSchema)) as Model<OldVoteModel>
