import BadRequestError from '../errors/BadRequestError';

function validateUserPayload(ctx, next) {
  const { email, password } = ctx.request.body;

  const regexEmail = /^[A-Za-z0-9\-_]+@\w+\.\w{2,}$/;
  const regexPassword = /(?=.*\d)(?=.*[a-z])?(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}/;

  const isValidEmail = regexEmail.test(email);
  const isValidPassword = regexPassword.test(password);

  if (!isValidEmail) throw new BadRequestError('Invalid email');
  if (!isValidPassword) throw new BadRequestError('Invalid password');

  return next();
}

// eslint-disable-next-line import/prefer-default-export
export { validateUserPayload };
