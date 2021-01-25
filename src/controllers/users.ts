import bcrypt from 'bcryptjs';

import { Context } from 'koa';
import User from '../models/user';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';

async function signUp(ctx: Context) {
  const { email, password } = ctx.request.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user) throw new BadRequestError('User exist');

  const hash = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    email: email.toLowerCase(), password: hash,
  }) as any;

  ctx.body = newUser.publicData;
}

async function signIn(ctx: Context) {
  const { email, password } = ctx.request.body;

  const user = await User.findOne({ email }) as any;

  if (!user) throw new NotFoundError('User not found');

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) throw new BadRequestError('Incorrect password');

  ctx.body = user.publicData;
}

export { signUp, signIn };
