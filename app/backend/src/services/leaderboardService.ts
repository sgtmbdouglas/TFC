import { IMatch } from '../Interfaces/Imatch';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import LeaderboardFormats from '../middlers/homeLeaderboard';
// import AwayleaderboardMiddlers from '../middlers/awayLeaderboard';

export default class ServiceLeaderboard {
  static teamGames(matches: IMatch[], side: string, id: number) {
    if (side === 'home') {
      return matches.filter((match) => match.homeTeam === id);
    } return matches.filter((match) => match.awayTeam === id);
  }

  public static async getAllHome() {
    const matchesFinish = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const leaderboards = teams.map((team) => {
      const teamGames = this.teamGames(matchesFinish, 'home', team.id);
      const teamHome = LeaderboardFormats.indexHome(teamGames);
      return { name: team.teamName, ...teamHome };
    });
    return LeaderboardFormats.leaderboardSort(leaderboards);
  }

  public static async getAllAway() {
    const matchesFinish = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const leaderboards = teams.map((team) => {
      const teamGames = this.teamGames(matchesFinish, 'away', team.id);
      const teamAway = LeaderboardFormats.indexAway(teamGames);
      return { name: team.teamName, ...teamAway };
    });
    return LeaderboardFormats.leaderboardSort(leaderboards);
  }

  public static async getAll() {
    const matchesFinish = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();

    const leaderboardsMap = teams.map((team) => {
      const homeTeamGames = this.teamGames(matchesFinish, 'home', team.id);
      const awayTeamGames = this.teamGames(matchesFinish, 'away', team.id);
      const teamHome = LeaderboardFormats.indexHome(homeTeamGames);
      const teamAway = LeaderboardFormats.indexAway(awayTeamGames);
      const finalResult = LeaderboardFormats.finalLeaderboard(teamHome, teamAway);
      return { name: team.teamName, ...finalResult };
    });
    return LeaderboardFormats.leaderboardSort(leaderboardsMap);
  }
}
