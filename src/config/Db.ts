import * as dotenv from 'dotenv';

dotenv.config();

export const DbConfig = {
  DB_CONNECTIONSTRING: process.env.REACT_APP_DB_CONNECTIONSTRING || '',
  DB_NAME: process.env.REACT_APP_DB_NAME || '',
};
