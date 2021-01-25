/* eslint-disable @typescript-eslint/no-unused-vars */
import { checkPayload, checkEmail, checkPassword } from './utils';
import BadRequestError from '../errors/BadRequestError';

const validEmail = 'test@mail.ru';
const invalidEmail = 'test@mail.r';
const validPassword = 'Qwerty1!';
const invalidPassword = 'qqweasasdD#';

it('Check email', () => {
  expect(checkEmail(validEmail)).toBeTruthy();
  expect(checkEmail('test@facebook.com')).toBeTruthy();
  expect(checkEmail(invalidEmail)).toBeFalsy();
  expect(checkEmail('test.ru')).toBeFalsy();
});

it('Check password', () => {
  expect(checkPassword(validPassword)).toBeTruthy();
  expect(checkPassword('qqweasasdD#2')).toBeTruthy();
  expect(checkPassword(invalidPassword)).toBeFalsy();
  expect(checkPassword('1111111111')).toBeFalsy();
  expect(checkPassword('11111AAAAAA')).toBeFalsy();
  expect(checkPassword('11111AAAAAA@')).toBeTruthy();
});

it('Check user`s payload', () => {
  expect(checkPayload({ email: validEmail, password: validPassword })).toBeTruthy();
  expect(checkPayload({ email: 'test@facebook.com', password: 'qqweasasdD#2' })).toBeTruthy();
  expect(() => checkPayload(
    { email: invalidEmail, password: invalidPassword },
  )).toThrowError(BadRequestError);
  expect(() => checkPayload(
    { email: 'test.ru', password: '1111111111' },
  )).toThrowError(BadRequestError);
  expect(() => checkPayload(
    { email: validEmail, password: invalidPassword },
  )).toThrowError(BadRequestError);
  expect(() => checkPayload(
    { email: invalidEmail, password: validPassword },
  )).toThrowError(BadRequestError);
});
