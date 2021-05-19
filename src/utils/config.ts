import * as dotenv from 'dotenv'

dotenv.config()

export const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  DB_CONNECTIONSTRING: process.env.REACT_APP_DB_CONNECTIONSTRING || '',
  GITHUB_ACCESS_TOKEN: process.env.REACT_APP_GITHUB_ACCESS_TOKEN || '',
}
