/* eslint-disable */
import express from 'express';
import supertest from 'supertest';
import mongoose from 'mongoose';
import router from '../../router';
import Event from '../../models/event-model';
import 'regenerator-runtime/runtime';

const databaseName = 'arcTest';

describe('event controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const event = {
    eventName: "Cheeky Nando's",
    date: 'yesterday',
    venue: 'KFC',
    foodCost: '100 pounds',
    drinksCost: '200 pounds',
    totalCost: '300 pounds',
    creator: 'Alex',
    arcs: {
      'alex@bolton.com': 100,
      'zou@minowa.com': 200,
    },
    arcsPaid: {
      'alex@bolton.com': false,
      'zou@minowa.com': false,
    },
    arcItems: {
      'alex@bolton.com': 'FD',
      'zou@minowa.com': 'FD',
    },
    arcFirstNames: {
      'alex@bolton.com': 'Alex',
      'zou@minowa.com': 'Zou',
    },
    arcNameArray: [
      'alex@bolton.com',
      'zou@minowa.com',
    ]
  };

  describe('postEvents function', () => {
    beforeAll(async() => {
      await Event.deleteMany();
    });

    it('creates an event when passed an event object', async () => {
      await request.post('/eventcreate').send(event);
      const response = await Event.findOne({ eventName: "Cheeky Nando's" });
      expect(response).toMatchObject(event);
    });

    it('returns a status code of 201', async () => {
      const response = await request.post('/eventcreate').send(event);
      expect(response.status).toEqual(201);
    });

    it('returns the created event', async () => {
      const response = await request.post('/eventcreate').send(event);
      expect(response.body).toMatchObject(event);
    });

    it('returns data in JSON format', async () => {
      const response = await request.post('/eventcreate').send(event);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('does not create an event when passed incomplete data', async () => {
      const badEvent = { eventName: "Morley's" };
      await request.post('/eventcreate').send(badEvent);
      const response = await Event.findOne({ eventName: "Morley's" });
      expect(response).toBeNull();
    });
  });

  describe('getEventsList function', () => {
    beforeAll(async () => {
      await Event.deleteMany();
      await Event.create(event);
    });

    it("retreives events linked to a user when passed that user's reference", async () => {
      const response = await request.post('/eventsList').send({ user: 'alex@bolton.com' });
      expect(response.body[0]).toMatchObject(event);
    });

    it('returns a status code of 200', async () => {
      const response = await request.post('/eventsList').send({ user: 'alex@bolton.com' });
      expect(response.status).toEqual(200);
    });

    it('returns data in JSON format', async () => {
      const response = await request.post('/eventcreate').send(event);
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('getEvent function', () => {
    beforeAll(async () => {
      await Event.deleteMany();
      await Event.create(event);
    });
  });
});
