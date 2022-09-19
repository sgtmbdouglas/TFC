import { IMatch } from '../Interfaces/Imatch';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import LeaderboardMiddlers from '../middlers/leaderboard';

export default class LeaderboardService {
  static teamGames(matches: IMatch[], id: number) {
    return matches.filter((match) => match.homeTeam === id);
  }

  static async getAllHome() {
    const matchesFinish = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const leaderboard = teams.map((team) => {
      const teamGamesId = this.teamGames(matchesFinish, team.id);
      const boardTeamGame = LeaderboardMiddlers.index(teamGamesId);
      return { name: team.teamName, ...boardTeamGame };
    });
    return LeaderboardMiddlers.leaderboardSort(leaderboard);
  }
}
