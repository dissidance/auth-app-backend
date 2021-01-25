import { Context, Next } from 'koa';
import BadRequestError from '../errors/BadRequestError';
import { checkPayload, checkEmail } from '../utils/utils';

function validateSignIn(ctx: Context, next: Next) {
  const { email, password } = ctx.request.body;

  if (!checkEmail(email)) throw new BadRequestError('Invalid email');

  if (!password.length) throw new BadRequestError('Invalid password');

  return next();
}

function validateSignUp(ctx: Context, next: Next) {
  const { email, password } = ctx.request.body;

  checkPayload({ email, password });

  return next();
}

// eslint-disable-next-line import/prefer-default-export
export { validateSignIn, validateSignUp };
