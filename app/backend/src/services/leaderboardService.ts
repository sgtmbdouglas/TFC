import { IMatch } from '../Interfaces/Imatch';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import LeaderboardMiddlers from '../middlers/homeLeaderboard';
import AwayleaderboardMiddlers from '../middlers/awayLeaderboard';

export default class LeaderboardService {
  static teamGamesHome(matches: IMatch[], id: number) {
    return matches.filter((match) => match.homeTeam === id);
  }

  static async getAllHome() {
    const matchesFinish = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const leaderboardHome = teams.map((team) => {
      const teamGamesId = this.teamGamesHome(matchesFinish, team.id);
      const boardTeamGame = LeaderboardMiddlers.indexHome(teamGamesId);
      return { name: team.teamName, ...boardTeamGame };
    });
    return LeaderboardMiddlers.leaderboardSort(leaderboardHome);
  }

  static teamGamesAway(matches: IMatch[], id: number) {
    return matches.filter((match) => match.awayTeam === id);
  }

  static async getAllAway() {
    const matchesFinish = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const leaderboardAway = teams.map((team) => {
      const teamGamesId = this.teamGamesAway(matchesFinish, team.id);
      const boardTeamGame = AwayleaderboardMiddlers.indexAway(teamGamesId);
      return { name: team.teamName, ...boardTeamGame };
    });
    return LeaderboardMiddlers.leaderboardSort(leaderboardAway);
  }
}
