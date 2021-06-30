import User from '../models/User';
import bcrypt from 'bcryptjs';

export default class UserService {

  static async create({ email, password, profilePhotoUrl }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    console.log(passwordHash);
    
    return User.insert({ email, passwordHash, profilePhotoUrl });
  }
}
