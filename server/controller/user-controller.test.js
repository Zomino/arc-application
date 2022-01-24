/* eslint-disable */

import express from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
import router from '../router';
import 'regenerator-runtime/runtime';
import User from '../models/user-model';

const dbName = 'arcTest';

describe('User Model tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${dbName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
    await User.deleteMany();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('POST /usercreate', async () => {
    // Create and post our new user
    const userDetails = {
      firstName: 'Tex',
      lastName: 'Howdy',
      email: 'tex.howdy@examplia.com',
      password: 'password',
    };
    await request.post('/userCreate').send(userDetails);

    // Find in test DB and compare
    const user = await User.findOne({ firstName: 'Tex' });
    expect(user).toMatchObject(userDetails);
  });

  it('POST /user', async () => {
    // Check we don't have the user already
    const nullUser = await User.findOne({ firstName: 'Tex' });
    expect(nullUser).toBeNull();

    // Create our user in test DB
    const userDetails = {
      firstName: 'Tex',
      lastName: 'Howdy',
      email: 'tex.howdy@examplia.com',
      password: 'password',
    };
    await User.create(userDetails);

    // Request for user and compare
    const user = await request.post('/user').send({email: userDetails.email});
    expect(user.body).toMatchObject(userDetails);

  });

  it('GET /userlist', async () => {
    // Check we don't have the user already
    const nullUser = await User.findOne({ firstName: 'Tex' });
    expect(nullUser).toBeNull();

    // Create our users in test DB
    const userOneDetails = {
      firstName: 'Tex',
      lastName: 'Howdy',
      email: 'tex.howdy@examplia.com',
      password: 'password1',
    };
    await User.create(userOneDetails);
    const userTwoDetails = {
      firstName: 'Tasha',
      lastName: 'Bonjour',
      email: 'tash.bonjour@examplia.com',
      password: 'password2',
    };
    await User.create(userTwoDetails);

    // Request for user and compare
    const users = await request.get('/userlist');

    // Check users match
    expect(users.body[0]).toMatchObject(userOneDetails);
    expect(users.body[1]).toMatchObject(userTwoDetails);
  });
});

export default {};
