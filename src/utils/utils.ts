import BadRequestError from '../errors/BadRequestError';

const checkEmail = (email: string): boolean => {
  const regexEmail = /^[A-Za-z0-9\-_]+@\w+\.\w{2,}$/;
  const isValidEmail = regexEmail.test(email);

  return isValidEmail;
};

const checkPassword = (password: string): boolean => {
  const regexPassword = /(?=.*\d)(?=.*[a-z])?(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}/;
  const isValidPassword = regexPassword.test(password);

  return isValidPassword;
};

const checkPayload = ({ email, password }: {email: string, password: string}): boolean => {
  if (!checkEmail(email)) throw new BadRequestError('Invalid email');
  if (!checkPassword(password)) throw new BadRequestError('Invalid password');

  return checkEmail(email) && checkPassword(password);
};

export { checkPayload, checkEmail, checkPassword };
