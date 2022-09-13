import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import http from '../utils/metodosHttp';

export interface Iuser {
  id: number;
  email: string;
}

export default class tokenValidation {
  static tokenValidatiom = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(http.unauthorize).json({ message: 'Token not found' });
    const decodeBOdy = jwt.decode(authorization) as Iuser;
    try {
      if (decodeBOdy.id === 1) {
        return res.status(http.okStatus).json({ role: 'admin' });
      }
      if (decodeBOdy.id === 2) {
        return res.status(200).json({ role: 'user' });
      }
      return res.status(http.okStatus).json(decodeBOdy);
    } catch ({ message }) {
      return res.status(http.unauthorize).json({ message });
    }
  };
}
