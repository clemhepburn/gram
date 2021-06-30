import jwt from 'jsonwebtoken';
import pool from '../utils/pool.js';

export default class User {
    id;
    email;
    passwordHash;
    profilePhotoUrl;

    constructor(row) {
      this.id = row.id;
      this.email = row.email;
      this.passwordHash = row.password_hash;
      this.profilePhotoUrl = row.profile_photo_url;
    }

    static async insert({ email, passwordHash, profilePhotoUrl }) {


      const { rows } = await pool.query(
        'INSERT INTO users (email, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *',
        [email, passwordHash, profilePhotoUrl]
      );

      return new User(rows[0]);
    }

    authToken() {
      return jwt.sign({ ...this }, process.env.APP_SECRET, {
        expiresIn: '24h'
      });
    }

    toJSON() {
      return {
        id: this.id,
        email: this.email,
        profilePhotoUrl: this.profilePhotoUrl
      };
    }
}
