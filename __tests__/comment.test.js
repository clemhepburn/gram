import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';
import Comment from '../lib/models/Comment.js';

describe('demo routes', () => {

  let user = {}; 
  let post = {};
  let agent;

  beforeEach(async() => {
    await setup(pool);
    agent = await request.agent(app);
    user = await UserService.create({
      username: 'clem',
      password: 'cinnamon',
      profilePhotoUrl: 'tom.jpg'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'clem',
        password:'cinnamon'
      });

  });

  it('posts a comment to a post via POST', async() => {

    post = await Post.insert({
      userId: user.id,
      photoUrl: 'pic.jpg',
      caption: 'Here i am again',
      tags: ['unending riddle', 'squelching', 'exponent']
    });

    const res = await agent
      .post('/api/v1/comments')
      .send({
        commentBy: user.id,
        post: post.id,
        comment: 'Pretty neat!'
      });

    expect(res.body).toEqual({
      id: '1',
      commentBy: user.id,
      post: post.id,
      comment: 'Pretty neat!'
    });
  });

  it('deletes a comment via DELETE', async() => {

    post = await Post.insert({
      userId: user.id,
      photoUrl: 'pic.jpg',
      caption: 'hello???',
      tags: ['lamp', 'crayon']
    });

    const comment = await Comment.insert({
      id: '1',
      commentBy: user.id,
      post: post.id,
      comment: 'Want 500 dollars today? follow for free giveaway'
    });
    
    const res = await agent
      .delete(`/api/v1/comments/${comment.id}`)
      .send(comment);

    expect(res.body).toEqual(comment);

  });

});
