import * as bcrypt from 'bcryptjs';
// bcrypt é uma função de hash de senha
import User from '../database/models/Users';
import Jwt from '../utils/jwt';

export default class UsersService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    // console.log('ssss', user);
    // console.log('senha do banco', user?.password);
    // console.log('senha do user', password);
    if (!user) {
      return null;
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user?.password);
    // console.log('bcript retorn', isPasswordCorrect);
    if (!isPasswordCorrect) {
      return null;
    }
    const token = Jwt.sign({ id: user.id, email: user.email });
    return { token };
  }
}
