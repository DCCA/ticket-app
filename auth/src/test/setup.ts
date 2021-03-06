import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;
// Start mongoDB in memory before tests
beforeAll(async () => {
  // Set the env vars
  process.env.JWT_KEY = 'asdf';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Run before each test
beforeEach(async () => {
  // Get all collections
  const collections = await mongoose.connection.db.collections();
  // Delete all collections
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Run after each test
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// Helper global func

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
