import { Document, Model, model, models, Schema } from 'mongoose'
import { Vote } from 'src/types'

interface VoteModel extends Vote, Document {}

const voteSchema: Schema = new Schema({
  id: { type: String, required: true, lowercase: true, trim: true },
  number: { type: Number, required: true },
  state: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Date, required: true },
})

export default (models.Vote
  ? models.Vote
  : model<VoteModel>('Vote', voteSchema)) as Model<VoteModel>
