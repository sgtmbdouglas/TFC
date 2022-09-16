import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import http from '../utils/metodosHttp';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class tokenValidation {
  static tokenValidatiom = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam } = req.body;
    if (!authorization) return res.status(http.unauthorize).json({ message: 'Token not found' });
    if (homeTeam === awayTeam) return res.status(http.unauthorize).json({ message: 'equal teams' });
    try {
      jwt.verify(authorization, secret);
      next();
    } catch ({ message }) {
      return res.status(http.unauthorize).json({ message });
    }
  };
}
