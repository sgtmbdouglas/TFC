import { Request, Response } from 'express';
import MatchesService from '../services/matchService';
import http from '../utils/metodosHttp';

export default class MatchesController {
  static getAll = async (_req: Request, res: Response) => {
    const matches = await MatchesService.getAll();
    return res.status(http.okStatus).json(matches);
  };

  static postMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    // console.log({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    const matche = await MatchesService.postMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    if (!matche) return res.status(http.unauthorize).json({ message: 'some team does not exist' });
    return res.status(http.okStatus).json(matche);
  };
}
