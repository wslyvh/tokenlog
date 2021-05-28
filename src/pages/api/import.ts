import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { APP_CONFIG } from 'src/utils/config'
import VoteModel from 'src/repository/models/VoteModel'
import { MongoVotingRepository } from 'src/repository/voting'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Connect to new/v2 database..')
  await mongoose.connect(APP_CONFIG.DB_CONNECTIONSTRING, APP_CONFIG.DB_OPTIONS)

  const repo = new MongoVotingRepository()
  const models = await repo.FindAll()
  console.log(models.length, '# of votes on new DB from repo')

  const v2models = await VoteModel.find()
  console.log(v2models.length, '# of votes on new DB from model')

  const ExportedModels = require('export.json')
  if (ExportedModels) {
    console.log(`Creating ${ExportedModels.length} new models...`)
    const results = await VoteModel.create(ExportedModels)
    res.status(200).json(results)
  }

  res.status(400).json('Unable to import votes')
}
