import { Context, Next } from 'koa';

async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;

    if (!err.statusCode) {
      const { statusCode = 500, message } = err;
      ctx.status = statusCode;
      ctx.body = {
        message: statusCode === 500
          ? 'Server Error'
          : message,
      };
    }

    ctx.status = err.statusCode;
    ctx.body = {
      message: err.message,
    };
  }
}

export default errorHandler;
