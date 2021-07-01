import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Post from '../models/Post';

export default Router()
  .post('/api/v1/posts', ensureAuth, (req, res, next) => {

    Post.insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/api/v1/posts', ensureAuth, async(req, res, next) => {

    Post.findAllPosts()
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/api/v1/posts/:id', ensureAuth, async(req, res, next) => {

    Post.findByPostId(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/api/v1/posts/:id', ensureAuth, (req, res, next) => {

    Post.patch(req.body, req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/api/v1/posts/:id', ensureAuth, (req, res, next) => {
    Post.delete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });
  

