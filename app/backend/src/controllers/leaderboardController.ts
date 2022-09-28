import { Request, Response } from 'express';
import http from '../utils/metodosHttp';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getAllHome(_req: Request, res: Response) {
    const results = await LeaderboardService.getAllHome();
    res.status(http.okStatus).json(results);
  }

  static async getAllAway(_req: Request, res: Response) {
    const results = await LeaderboardService.getAllAway();
    res.status(http.okStatus).json(results);
  }

  static async getAll(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getAll();
    res.status(http.okStatus).json(leaderboard);
  }
}
