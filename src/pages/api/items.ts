import type { NextApiRequest, NextApiResponse } from 'next'
import { BacklogItem } from 'src/types'
import { Data } from './interfaces/data'
import { Create } from 'src/repository/factory'
import { GithubService } from 'src/services/github/service'

const repository = Create()
const service = new GithubService(repository)

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data<Array<BacklogItem>>>
) => {
  if (req.method !== 'GET')
    return res.status(405).json({ status: 405, message: 'Method Not Allowed' })

  const backlogId =
    req.query['backlog'] && typeof req.query['backlog'] === 'string'
      ? req.query['backlog'].toString()
      : ''
  if (!backlogId)
    return res.status(400).json({ status: 400, message: 'Bad Request' })

  const result = await service.GetBacklogItems(backlogId)
  if (result) {
    return res.status(200).json({ status: 200, data: result, message: '' })
  }

  return res
    .status(400)
    .json({ status: 400, message: `Unable to get backlog items. ${backlogId}` })
}
