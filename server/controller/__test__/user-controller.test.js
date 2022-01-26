/* eslint-disable */

import express from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
import router from '../../router';
import 'regenerator-runtime/runtime';
import User from '../../models/user-model';

const dbName = 'arcTest';

describe('User Model tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${dbName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('User creation endpoints', () => {
    beforeAll(async () => {
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
  })

  describe('User retrieval endpoints', () => {
    const userOneDetails = {
      firstName: 'Tex',
      lastName: 'Howdy',
      email: 'tex.howdy@examplia.com',
      password: 'password1',
    };
    const userTwoDetails = {
      firstName: 'Tasha',
      lastName: 'Bonjour',
      email: 'tash.bonjour@examplia.com',
      password: 'password2',
    };

    beforeAll(async () => {
      await User.deleteMany();
      await User.create(userOneDetails);
      await User.create(userTwoDetails);
    });

    it('POST /user', async () => {
      // Request for user and compare
      const user = await request.post('/user').send({ email: userOneDetails.email });
      expect(user.body).toMatchObject(userOneDetails);
    });

    it('GET /userlist', async () => {
      // Request for user and compare
      const users = await request.get('/userlist');

      // Check users match
      expect(users.body[0]).toMatchObject(userOneDetails);
      expect(users.body[1]).toMatchObject(userTwoDetails);
    });

  })
});

export default {};
