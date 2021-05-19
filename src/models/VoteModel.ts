import { Document, Model, model, models, Schema } from 'mongoose'
import { Vote } from 'src/types'

interface VoteModel extends Vote, Document {}

const voteSchema: Schema = new Schema({
  org: { type: String, required: true, lowercase: true, trim: true },
  repo: { type: String, required: true, lowercase: true, trim: true },
  number: { type: Number, required: true },
  state: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Date, required: true },
  closed: { type: Boolean, required: false, default: false }, // TODO: remove - used state instead
})

export default (models.Vote
  ? models.Vote
  : model<VoteModel>('Vote', voteSchema)) as Model<VoteModel>
