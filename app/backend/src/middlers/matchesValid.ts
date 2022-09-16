import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IMatch } from '../Interfaces/Imatch';
import http from '../utils/metodosHttp';

const secret = process.env.JWT_SECRET || 'jwt_secret';
const token = 'It is not possible to create a match with two equal teams';

export default class tokenValidation {
  static tokenValidatiom = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam } = req.body;
    if (!authorization) {
      return res.status(http.unauthorize).json({ message: 'Token must be a valid token' });
    }
    const decodeBody = jwt.decode(authorization) as unknown as IMatch;
    if (!decodeBody) {
      return res.status(http.unauthorize).json({ message: 'Token must be a valid token' });
    }
    if (homeTeam === awayTeam) {
      return res.status(http.unauthorize).json({ message: token });
    }
    try {
      jwt.verify(authorization, secret);
      next();
    } catch ({ message }) {
      return res.status(http.unauthorize).json({ message });
    }
  };
}
