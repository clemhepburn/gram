import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';



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

  it('gets all posts', async() => {
    const post1 = await Post.insert({
      userId: user.id,
      photoUrl: 'pic.jpg',
      caption: 'hey friends',
      tags: ['rice', 'ambivalence']
    });

    const post2 = await Post.insert({
      userId: user.id,
      photoUrl: 'pic2.jpg',
      caption: 'check this out',
      tags: ['fractal', 'sticky']
    });

    const post3 = await Post.insert({
      userId: user.id,
      photoUrl: 'pic3.jpg',
      caption: 'what am i doing here',
      tags: ['mortality', 'old spaghetti factory']
    });

    const res = await agent
      .get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2, post3]);
    
  });

  it('gets a post by id', async() => {
    const post = await Post.insert({
      userId: user.id,
      photoUrl: 'photo.jpg',
      caption: 'anybody else feeling kind of weird?',
      tags: ['breakfast', 'telephone pole', 'dysphoria']
    });

    const res = await agent
      .get(`/api/v1/posts/${post.id}`);

    expect(res.body).toEqual(post);
  });

  it('updates a post', async() => {
    const post = await Post.insert({
      userId: user.id,
      photoUrl: 'pic.jpg',
      caption: 'embarassing post',
      tags: ['earnest sentiment', 'my real self']
    });

    post.caption = 'something palatable and fun';

    const res = await agent
      .patch(`/api/v1/posts/${post.id}`)
      .send({ caption: 'something palatable and fun' });

    expect(res.body).toEqual(post);
  });

  it('deletes a post', async() => {
    const post  = await Post.insert({
      userId: user.id,
      photoUrl: 'aaaa',
      caption: 'oopsie',
      tags: ['yikes', 'why me']
    });
    
    const res = await agent
      .delete(`/api/v1/posts/${post.id}`)
      .send(post);
      

    expect(res.body).toEqual(post);
  });

  it('retrieves the 10 posts with the most comments', async() => {
    const post1 = await Post.insert({
      userId: user.id,
      photoUrl: 'dsfjshdf',
      caption: 'hi',
      tags: ['milk', 'raven']
    });

    const post2 = await Post.insert({
      userId: user.id,
      photoUrl: 'dsfjshdfsdsf',
      caption: 'hiii',
      tags: ['thoughts', 'leaf']
    });

    const post3 = await Post.insert({
      userId: user.id,
      photoUrl: 'dsfjssdfsdhdf',
      caption: 'hungry',
      tags: ['dogs', 'heaven']
    });

    const post4 = await Post.insert({
      userId: user.id,
      photoUrl: 'ttttttthdf',
      caption: 'the ol ranch',
      tags: ['family', 'christmas']
    });

    const post5 = await Post.insert({
      userId: user.id,
      photoUrl: 'riueruw',
      caption: 'mango',
      tags: ['drupe', 'thoughtful']
    });

    const post6 = await Post.insert({
      userId: user.id,
      photoUrl: 'opoooooohdf',
      caption: 'uh oh',
      tags: ['smiling', 'huge']
    });

    const post7 = await Post.insert({
      userId: user.id,
      photoUrl: 'dsfsdfsjshdf',
      caption: 'what now?',
      tags: ['paris', 'syndrome']
    });

    const post8 = await Post.insert({
      userId: user.id,
      photoUrl: 'bbbb',
      caption: 'rainy day',
      tags: ['caffeine', 'construction']
    });

    const post9 = await Post.insert({
      userId: user.id,
      photoUrl: 'uuuuu',
      caption: 'my new carafe',
      tags: ['water drinker', 'alt lifestyle']
    });

    const post10 = await Post.insert({
      userId: user.id,
      photoUrl: 'ppp',
      caption: 'what do you think guys?',
      tags: ['new style', 'infinite being']
    });

    const res = await request(app)
      .get('api/v1/posts/popular');

    expect(res.bpdy).toEqual([post1, post2, post3, post4, post5, post6, post7, post8, post9, post10]);

  });
});
