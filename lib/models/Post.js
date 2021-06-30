import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class Post {
  id;
  user;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.user = row.user;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ user, photoUrl, caption, tags }) {

    const { rows } = await pool.query(
      'INSERT INTO posts (user, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *', 
      [user, photoUrl, caption, tags]
    );

    return new Post(rows[0]);
  }

  authToken() {
    return jwt.sign({ ...this }), process.env.APP_SECRET, {
      expiresIn: '24h'
    };
  }

  toJSON() {
    return {
      id: this.id,
      user: this.user,
      photoUrl: this.photoUrl,
      caption: this.caption,
      tags: this.tags
    };
  }
}
