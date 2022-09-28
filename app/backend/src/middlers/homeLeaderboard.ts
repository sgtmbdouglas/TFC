import { ILeaderboard } from '../Interfaces/Ileaderboard';
import { IMatch } from '../Interfaces/Imatch';

export default class LeaderboardFormats {
  static totalPoints(teamGames: IMatch[], side: string) {
    const win = 3;
    const draw = 1;
    if (side === 'home') {
      return teamGames.reduce((acc, match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          return acc + win;
        } if (match.homeTeamGoals === match.awayTeamGoals) {
          return acc + draw;
        } return acc;
      }, 0);
    }
    return teamGames.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return acc + win;
      } if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + draw;
      } return acc;
    }, 0);
  }

  static totalGames(teamGames: IMatch[]) {
    return teamGames.length;
  }

  static totalVictories(teamGames: IMatch[], side: string) {
    if (side === 'home') {
      return teamGames.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    } return teamGames.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  static totalDraws(teamGames: IMatch[]) {
    return teamGames.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  static totalLosses(teamGames: IMatch[], side: string) {
    if (side === 'home') {
      return teamGames.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    } return teamGames.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  static goalsFavor(teamGames: IMatch[], side: string) {
    if (side === 'home') {
      return teamGames.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    }
    return teamGames.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  static goalsOwn(teamGames: IMatch[], side: string) {
    if (side === 'home') {
      return teamGames.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    }
    return teamGames.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  static goalsBalance(teamGames: IMatch[], side: string) {
    if (side === 'home') {
      return this.goalsFavor(teamGames, 'home') - this.goalsOwn(teamGames, 'home');
    }
    return this.goalsFavor(teamGames, 'away') - this.goalsOwn(teamGames, 'away');
  }

  static efficiency(match: IMatch[], side: string) {
    if (side === 'home') {
      const totalPoints = this.totalPoints(match, 'home');
      const totalGames = this.totalGames(match);
      return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    }
    const totalPoints = this.totalPoints(match, 'away');
    const totalGames = this.totalGames(match);
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static leaderboardSort(leaderboard: ILeaderboard[]) {
    leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return leaderboard;
  }

  static indexHome(teamGames: IMatch[]) {
    return {
      totalPoints: this.totalPoints(teamGames, 'home'),
      totalGames: this.totalGames(teamGames),
      totalVictories: this.totalVictories(teamGames, 'home'),
      totalDraws: this.totalDraws(teamGames),
      totalLosses: this.totalLosses(teamGames, 'home'),
      goalsFavor: this.goalsFavor(teamGames, 'home'),
      goalsOwn: this.goalsOwn(teamGames, 'home'),
      goalsBalance: this.goalsBalance(teamGames, 'home'),
      efficiency: this.efficiency(teamGames, 'home'),
    };
  }

  static indexAway(match: IMatch[]) {
    return {
      totalPoints: this.totalPoints(match, 'away'),
      totalGames: this.totalGames(match),
      totalVictories: this.totalVictories(match, 'away'),
      totalDraws: this.totalDraws(match),
      totalLosses: this.totalLosses(match, 'away'),
      goalsFavor: this.goalsFavor(match, 'away'),
      goalsOwn: this.goalsOwn(match, 'away'),
      goalsBalance: this.goalsBalance(match, 'away'),
      efficiency: this.efficiency(match, 'away'),
    };
  }

  static finalLeaderboard(home: ILeaderboard, away: ILeaderboard) {
    return {
      totalPoints: home.totalPoints + away.totalPoints,
      totalGames: home.totalGames + away.totalGames,
      totalVictories: home.totalVictories + away.totalVictories,
      totalDraws: home.totalDraws + away.totalDraws,
      totalLosses: home.totalLosses + away.totalLosses,
      goalsFavor: home.goalsFavor + away.goalsFavor,
      goalsOwn: home.goalsOwn + away.goalsOwn,
      goalsBalance: home.goalsBalance + away.goalsBalance,
      efficiency: Number((((home.totalPoints + away.totalPoints)
        / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2)),
    };
  }
}
