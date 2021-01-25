import { Context, Next } from 'koa';
import { checkPayload } from '../utils/utils';

function validateUserPayload(ctx: Context, next: Next) {
  const { email, password } = ctx.request.body;

  checkPayload({ email, password });

  return next();
}

// eslint-disable-next-line import/prefer-default-export
export { validateUserPayload };
