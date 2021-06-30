import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'superagent';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new post via POST', async() => {
    const res = await request(app)
      .post('/api/v1/posts')
      .send({
        user: 'clem',
        photoUrl: 'picture.jpg',
        caption: 'check it out everybody',
        tags: ['broccoli', 'rice', 'passion']
      });

    expect(res.body).toEqual({
      user: 'clem',
      photoUrl: 'picture.jpg',
      caption: 'check it out everybody',
      tags: ['broccoli', 'rice', 'passion']
    });
  });

  
});

