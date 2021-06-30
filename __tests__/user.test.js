import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);


describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'clem',
        password: 'password',
        profilePhotoUrl: expect.any(String)
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'clem',
      profilePhotoUrl: expect.any(String)
    });

  });

  it('logs in a user via POST', async() => {

    const user = await UserService.create({
      username: 'clem',
      password: 'password',
      profilePhotoUrl: 'picture'
    });
    
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        username: 'clem',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: user.id,
      username: user.username,
      profilePhotoUrl: 'picture'
    });
  });

  it('verifies a user is logged in', async() => {
    const agent = request.agent(app);
    const user = await UserService.create({
      username: 'clem',
      password: 'password',
      profilePhotoUrl: 'picture'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'clem',
        password: 'password'
      });

    const res = await agent.get('/api/v1/verify');
    expect(res.body).toEqual({
      id: user.id,
      username: 'clem',
      passwordHash: expect.any(String),
      profilePhotoUrl: 'picture',
      iat: expect.any(Number),
      exp: expect.any(Number)
    });
  });
});
