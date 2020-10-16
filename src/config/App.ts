import * as dotenv from 'dotenv';

dotenv.config();

export const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,

  ETHPLORER_APIKEY: process.env.REACT_APP_ETHPLORER_APIKEY || '',
};
