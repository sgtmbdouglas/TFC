import { ILeaderboard } from '../Interfaces/Ileaderboard';
import { IMatch } from '../Interfaces/Imatch';

export default class AwayleaderboardMiddlers {
  static totalPoints(teamGames: IMatch[]) {
    const win = 3;
    const draw = 1;
    const totalPointsTeam = teamGames.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return acc + win;
      } if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + draw;
      } return acc;
    }, 0);
    return totalPointsTeam;
  }

  static totalGames(teamGames: IMatch[]) {
    return teamGames.length;
  }

  static totalVictories(teamGames: IMatch[]) {
    const winsTeam = teamGames.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return winsTeam;
  }

  public static totalDraws(teamGames: IMatch[]) {
    const draws = teamGames.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return draws;
  }

  public static totalLosses(teamGames: IMatch[]) {
    const defeats = teamGames.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    return defeats;
  }

  public static goalsFavor(teamGames: IMatch[]) {
    const homeTotalGoals = teamGames.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return homeTotalGoals;
  }

  public static goalsOwn(teamGames: IMatch[]) {
    const awayTotalGoals = teamGames.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return awayTotalGoals;
  }

  public static goalsBalance(teamGames: IMatch[]) {
    const goalsBalance = this.goalsFavor(teamGames) - this.goalsOwn(teamGames);
    return goalsBalance;
  }

  public static efficiency(teamGames: IMatch[]) {
    const totalPoints = this.totalPoints(teamGames);
    const totalGames = this.totalGames(teamGames);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return parseFloat(efficiency);
  }

  public static leaderboardSort(leaderboard: ILeaderboard[]) {
    leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);
    return leaderboard;
  }

  static indexAway(teamGames: IMatch[]) {
    return {
      totalPoints: this.totalPoints(teamGames),
      totalGames: this.totalGames(teamGames),
      totalVictories: this.totalVictories(teamGames),
      totalDraws: this.totalDraws(teamGames),
      totalLosses: this.totalLosses(teamGames),
      goalsFavor: this.goalsFavor(teamGames),
      goalsOwn: this.goalsOwn(teamGames),
      goalsBalance: this.goalsBalance(teamGames),
      efficiency: this.efficiency(teamGames),
    };
  }
}
