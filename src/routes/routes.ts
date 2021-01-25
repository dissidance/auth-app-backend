import Router from 'koa-router';
import { signIn, signUp } from '../controllers/users';
import errorHandler from '../middleware/errorHandler';
import { validateSignIn, validateSignUp } from '../middleware/validator';

export default new Router()
  .use(errorHandler)
  .post('/signin', validateSignIn, signIn)
  .post('/signup', validateSignUp, signUp);
