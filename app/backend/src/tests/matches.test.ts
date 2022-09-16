import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Matches';
import { Response } from 'superagent';
import http from '../utils/metodosHttp';

chai.use(chaiHttp);
const { expect } = chai;

describe('* TESTANDO ROTAS (_8^() *', () => {
  let chaiResponse: Response;
    describe('** Testando rota /matches usando verbo GET **', () =>{
        const matches = [
            {
              id: 1,
              homeTeam: 'Avaí/Kindermann',
              awayTeam: 'Bahia',
              homeTeamGoals: 0,
              awayTeamGoals: 0,
              inProgress: true,
            },
            {
              id: 2,
              homeTeam: 'Avaí/Kindermann',
              awayTeam: 'Bahia',
              homeTeamGoals: 0,
              awayTeamGoals: 0,
              inProgress: true,
            },
          ];
        
          before(async () => {sinon.stub(Match, 'findAll').resolves(matches as unknown as Match[])});
          after(() => {(Match.findAll as sinon.SinonStub).restore()});
        
          it('Retorna todos os jogos', async() => {
            chaiResponse = await chai.request(app).get('/matches');
                expect(chaiResponse.status).to.equal(http.okStatus);
                expect(chaiResponse.body).to.deep.equal(matches);
              });
    })
}
);