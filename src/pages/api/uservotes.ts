import type { NextApiRequest, NextApiResponse } from 'next'
import { Vote } from 'src/types'
import { MongoVotingRepository } from 'src/repository/voting'
import { Data } from './interfaces/data'

const repo = new MongoVotingRepository()

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data<Array<Vote>>>
) => {
  if (req.method !== 'GET')
    return res.status(405).json({ status: 405, message: 'Method Not Allowed' })

  const backlogId =
    req.query['backlog'] && typeof req.query['backlog'] === 'string'
      ? req.query['backlog'].toString()
      : ''
  const address =
    req.query['address'] && typeof req.query['address'] === 'string'
      ? req.query['address'].toString()
      : ''
  if (!backlogId || !address)
    return res.status(400).json({ status: 400, message: 'Bad Request' })

  const result = await repo.GetUserVotes(backlogId, address)
  if (result) {
    return res.status(200).json({ status: 200, data: result, message: '' })
  }

  return res.status(400).json({ status: 400, message: 'Unable to cast vote.' })
}
