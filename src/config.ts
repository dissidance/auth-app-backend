/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  NODE_ENV: string
  PORT: number
  MONGO_URL: string
}

const {
  NODE_ENV,
  PORT,
  MONGO_URL,
} = process.env;

export default {
  NODE_ENV: NODE_ENV!,
  PORT: parseInt(PORT!, 10),
  MONGO_URL: MONGO_URL!,
} as Config;
