import { IMatch } from '../Interfaces/Imatch';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService {
  static async getAll() {
    const matches = Matches.findAll({ include: [
      {
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ] });
    return matches;
  }

  static async postMatch(body: IMatch) {
    const { homeTeam, awayTeam } = body;
    // console.log('antes dos find');
    const FindHomeTeam = await Teams.findByPk(homeTeam);
    // console.log('retorno da homeTeam', FindHomeTeam);
    const FindAwayTeam = await Teams.findByPk(awayTeam);
    // console.log('retorno da awayteam', FindAwayTeam);
    if (!FindHomeTeam || !FindAwayTeam) return null;
    // console.log('bode antes da funcao create ', body);
    return Matches.create(body);
  }
}
