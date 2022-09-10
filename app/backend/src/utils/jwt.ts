import * as jwt from 'jsonwebtoken';

class Jwt {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, 'jwt_secret');
  }
}

export default Jwt;
