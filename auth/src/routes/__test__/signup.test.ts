import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with invalid e-mail', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'a',
    })
    .expect(400);
});

it('returns a 400 with missing e-mail and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gmail.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

it('disallows diplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gmail.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gmail.com', password: 'password' })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gmail.com', password: 'password' })
    .expect(201);

  // We have a block for just HTTP request
  // We need to change the Secure in the cookieSession for tests
  expect(response.get('Set-Cookie')).toBeDefined();
});
