import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';
class Jwt {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, secret);
  }
}

export default Jwt;
