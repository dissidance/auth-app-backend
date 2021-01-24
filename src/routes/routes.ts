import Router from 'koa-router';
import { signIn, signUp } from '../controllers/users';
import errorHandler from '../middleware/errorHandler';
import { validateUserPayload } from '../middleware/validator';

export default new Router()
  .use(errorHandler)
  .post('/signin', validateUserPayload, signIn)
  .post('/signup', validateUserPayload, signUp);
