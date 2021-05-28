import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { APP_CONFIG } from 'src/utils/config'
import VoteModel from 'src/repository/models/v1/VoteModel'
import { Vote as V2Vote } from 'src/types'
import { Vote as V1Vote } from 'src/types/v1/Vote'
const fs = require('fs')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Connect to old/v1 database..')
  await mongoose.connect(
    process.env.REACT_APP_DB_CONNECTIONSTRING_OLD,
    APP_CONFIG.DB_OPTIONS
  )

  const v1models = await VoteModel.find()
  console.log(v1models.length, '# of votes on OLD db')

  console.log('Map to new/v2 data models..')
  const newModels = v1models.map((i: V1Vote) => {
    const org = i.org === 'tecommons' ? 'commonsbuild' : i.org
    return {
      backlog: `github:${org}/${i.repo}`,
      number: i.number,
      address: i.address,
      amount: i.cost,
      state: i.closed ? 'CLOSED' : 'OPEN',
      version: 2,
      timestamp: i.timestamp,
      signature: i.signature,
    } as V2Vote
  })

  const data = JSON.stringify(newModels, null, 2)
  try {
    fs.writeFileSync('export.json', data)
  } catch {
    console.log('Unable to write export to disk')
  }

  res.status(200).json(data)
}