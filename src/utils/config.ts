export const APP_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN || '',
  DB_CONNECTIONSTRING: process.env.DB_CONNECTIONSTRING || '',
  INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID || '',
  DB_OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
}
