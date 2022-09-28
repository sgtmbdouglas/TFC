import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import Match from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import { Response } from 'superagent';
import http from '../utils/metodosHttp';

chai.use(chaiHttp);
const { expect } = chai;

describe('* TESTANDO ROTAS (_8^() *', () => {
    let chaiResponse: Response;
    describe('** Testando rota /home usando verbo GET **', () => {
        // const matchesNoProgress = [
        //     {
        //         id: 1,
        //         homeTeam: 16,
        //         homeTeamGoals: 1,
        //         awayTeam: 8,
        //         awayTeamGoals: 1,
        //         inProgress: false
        //     },
        //     {
        //         id: 2,
        //         homeTeam: 9,
        //         homeTeamGoals: 1,
        //         awayTeam: 14,
        //         awayTeamGoals: 1,
        //         inProgress: false
        //     },
        // ];
        // const teams = [
        //     {
        //         id: 1,
        //         teamName:' Avaí/Kindermann'
        //     },
        //     {
        //         id: 2,
        //         teamName: 'Bahia'
        //     },
        // ]
        // const leaderboard = [
        //     {
        //         name: "Santos",
        //         totalPoints: 9,
        //         totalGames: 3,
        //         totalVictories: 3,
        //         totalDraws: 0,
        //         totalLosses: 0,
        //         goalsFavor: 9,
        //         goalsOwn: 3,
        //         goalsBalance: 6,
        //         efficiency: 100
        // }]

        // before(async () => {sinon.stub(Match, 'findAll').resolves(matchesNoProgress as unknown as Match[])});
        // before(async () => {sinon.stub(TeamsModel, "findAll").resolves(teams as TeamsModel[])});
        // after(() => {(TeamsModel.findAll as sinon.SinonStub).restore()});
        // after(() => {(Match.findAll as sinon.SinonStub).restore()});

        it('Retorna todos os leaderboards dos times da casa', async () => {
            chaiResponse = await chai.request(app).get("/leaderboard/home");
            expect(chaiResponse.status).to.equal(http.okStatus);
            // expect(chaiResponse.body).to.be.deep.equal([]); 
            // expect(chaiResponse.body).to.deep.equal(teams);
        });
        
    });

    describe('Testando rota /away usando verbo GET', () => {
        it('Retorna todos os leaderboards dos times visitantes', async () => {
            chaiResponse = await chai.request(app).get("/leaderboard/away");
            expect(chaiResponse.status).to.equal(http.okStatus);
            // expect(chaiResponse.body).to.be.deep.equal([]); 
        });
    })
    describe('Testando rota / usando verbo GET', () => {
        it('Retorna todos os leaderboards', async () => {
            chaiResponse = await chai.request(app).get("/leaderboard");
            expect(chaiResponse.status).to.equal(http.okStatus);
            // expect(chaiResponse.body).to.be.deep.equal([]); 
        });
    })
})
