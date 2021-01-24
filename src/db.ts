import mongoose from 'mongoose';
import cfg from './config';

interface DbOptions {
  autoIndex: boolean
  reconnectTries: number
  reconnectInterval: number
  poolSize: number
  bufferMaxEntries: number
  socketTimeoutMS: number
  keepAlive: boolean
  useNewUrlParser: boolean
  useFindAndModify: boolean
  dbName?: string
}

const mongoOptions: DbOptions = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 500,
  bufferMaxEntries: 0,
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

if (cfg.NODE_ENV === 'production') mongoOptions.dbName = 'auth-app';

async function init() {
  // eslint-disable-next-line no-return-await
  return await mongoose.connect(cfg.MONGO_URL, mongoOptions);
}

export default { init };
