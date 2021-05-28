import * as dotenv from 'dotenv'

dotenv.config()

export const APP_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  GITHUB_ACCESS_TOKEN: process.env.REACT_APP_GITHUB_ACCESS_TOKEN || '',
  DB_CONNECTIONSTRING: process.env.REACT_APP_DB_CONNECTIONSTRING || '',
  DB_OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
}
