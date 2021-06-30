import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('sings a user up via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'green@jogging.com',
        password: 'parklover94'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'green@jogging.com'
    });
  });
});
