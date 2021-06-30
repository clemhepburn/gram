import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';



describe('demo routes', () => {

  let user = {}; 
  let agent;

  beforeEach(async() => {
    await setup(pool);
    agent = await request.agent(app);
    user = await UserService.create({
      username: 'clem',
      password: 'password',
      profilePhotoUrl: 'picture'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'clem',
        password:'password'
      });

  });

  it('creates a post via POST', async() => {

    const res = await agent
      .post('/api/v1/posts')
      .send({
        userId: user.id,
        photoUrl: 'picture.jpg',
        caption: 'hey everybody on the website',
        tags: ['broccoli', 'passion']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: user.id,
      photoUrl: 'picture.jpg',
      caption: 'hey everybody on the website',
      tags: ['broccoli', 'passion']
    });
  });
});
