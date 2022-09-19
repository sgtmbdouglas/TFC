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
    const matche = await MatchesService.postMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    if (!matche) {
      return res.status(http.notFoundStatus).json({ message: 'There is no team with such id!' });
    }
    return res.status(http.createdStatus).json(matche);
  };

  static patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log('antes do parse id', typeof parseFloat(id));
    const idConvert = parseFloat(id);
    // console.log('depois do parse id', typeof idMatch);
    const query = await MatchesService.patchMatch(idConvert);
    // console.log('oque retornou', match);
    if (!query) {
      res.status(http.unauthorize).json({ message: 'this game is not in progresso' });
    }
    return res.status(http.okStatus).json({ message: 'Finished' });
  };

  static patchMatchId = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const idConvert = parseFloat(id);
    const matche = await MatchesService.updateGoals(homeTeamGoals, awayTeamGoals, idConvert);
    res.status(http.okStatus).json(matche);
  };
}
