import Teams from '../database/models/Teams';

export default class TeamsService {
  static async getAll() {
    const teams = await Teams.findAll();
    // console.log('retornou', teams);
    return teams;
  }

  static async getId(id: number) {
    const dataTeam = await Teams.findByPk(id);
    // console.log('service de teams', dataTeam);
    return dataTeam;
  }
}
