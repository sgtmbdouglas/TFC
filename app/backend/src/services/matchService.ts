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
}
