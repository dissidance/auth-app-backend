import request from 'supertest';
import mongoose from 'mongoose';
import app from './app';
import cfg from './config';

import User from './models/user';

const validEmail = 'test@mail.ru';
const validPassword = '111111!Q';

describe('The endpoints must respond', () => {
  let server;

  beforeAll(async () => {
    server = await app();
    await mongoose.connect(cfg.MONGO_URL);
  });

  afterAll(async (done) => {
    if (server) {
      server.close(done);
    }

    await User.deleteOne({ email: validEmail });

    return mongoose.disconnect();
  });

  it('POST "/signup" must return mail of the registered user and correct status', () => request(server)
    .post('/signup').send({ email: validEmail, password: validPassword }).then((response) => {
      expect(response.body.email).toEqual(validEmail);
      expect(response.status).toBe(200);
    }));

  it('POST "/signup" must return {message: "User exist"} and status 400', () => request(server)
    .post('/signup').send({ email: validEmail, password: validPassword }).then((response) => {
      expect(response.body.message).toEqual('User exist');
      expect(response.status).toBe(400);
    }));

  it('POST "/users" must return mail of the authorized user and correct status', () => request(server)
    .post('/signin').send({ email: validEmail, password: validPassword }).then((response) => {
      expect(response.body.email).toEqual(validEmail);
      expect(response.status).toBe(200);
    }));

  it('POST "/users" must return {message: "User not found"} and status 404', () => request(server)
    .post('/signin').send({ email: '123@mail.ru', password: validPassword }).then((response) => {
      expect(response.body.message).toEqual('User not found');
      expect(response.status).toBe(404);
    }));

  it('POST "/users" must return {message: "Invalid password"} and status 400', () => request(server)
    .post('/signin').send({ email: validEmail, password: '111111!' }).then((response) => {
      expect(response.body.message).toEqual('Invalid password');
      expect(response.status).toBe(400);
    }));
});
