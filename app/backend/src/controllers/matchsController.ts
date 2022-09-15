import { Request, Response } from 'express';
import MatchesService from '../services/matchService';
import http from '../utils/metodosHttp';

export default class MatchesController {
  static getAll = async (_req: Request, res: Response) => {
    const matches = await MatchesService.getAll();
    return res.status(http.okStatus).json(matches);
  };
}
