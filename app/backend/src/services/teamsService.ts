import Teams from '../database/models/Teams';

export default class TeamsService {
  static async getAll() {
    const teams = await Teams.findAll();
    // console.log('retornou', teams);
    return teams;
  }
}
