import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import validator from 'koa-validate';
import db from './db';
import api from './routes/routes';
import cfg from './config';

const validOrigins: string[] = ['http://localhost',
  'http://localhost:3000'];

async function startServer() {
  await db.init();

  const app = new Koa();

  validator(app);

  app
    .use(koaBody())
    .use(cors({
      // eslint-disable-next-line consistent-return
      origin: ({ headers: { origin } }) => {
        if (validOrigins.includes(origin)) { return origin; }
      },
      credentials: true,
    }))
    // .use(httpLogger)
    // .use(passport.initialize())
    // .use(passport.session())
    .use(api.routes())
    .listen(cfg.PORT, () => console.log(`Start server on ${cfg.PORT}`));
}

startServer();
