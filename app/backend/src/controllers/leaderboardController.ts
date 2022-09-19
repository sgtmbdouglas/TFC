import { Request, Response, NextFunction } from 'express';
import http from '../utils/metodosHttp';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getAllHome(_req: Request, res: Response, _next: NextFunction) {
    const results = await LeaderboardService.getAllHome();
    res.status(http.okStatus).json(results);
  }
}
