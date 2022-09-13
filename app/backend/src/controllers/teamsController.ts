import { Request, Response } from 'express';
import http from '../utils/metodosHttp';
// import http from 'src/utils/metodosHttp';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    console.log('entrouuuuuu');
    const teams = await TeamsService.getAll();
    return res.status(http.okStatus).json(teams);
  }
}
