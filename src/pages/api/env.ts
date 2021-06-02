import type { NextApiRequest, NextApiResponse } from 'next'
import { APP_CONFIG } from 'src/utils/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Check env variables..')

  if (APP_CONFIG.GITHUB_ACCESS_TOKEN && APP_CONFIG.DB_CONNECTIONSTRING) {
    res.status(200).json('.env variables are set')
  }

  res.status(400).json('Error')
}
