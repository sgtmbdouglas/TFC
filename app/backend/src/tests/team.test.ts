// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// import { app } from '../app';
// import TeamsModel from '../database/models/Teams';
// import { Response } from 'superagent';
// import http from '../utils/metodosHttp';

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('* TESTANDO ROTAS (_8^() *', () => {
//     // ver como ajeita 2 de identacao
//     let chaiResponse: Response;
//     describe('** Testando rota /teams usando verbo GET **', () => {
//         const teams = [
//             {
//                 id: 1,
//                 teamName:' Avaí/Kindermann'
//             },
//             {
//                 id: 2,
//                 teamName: 'Bahia'
//             },
//         ]

//         before(async () => {sinon.stub(TeamsModel, "findAll").resolves(teams as TeamsModel[])});
//         after(() => {(TeamsModel.findAll as sinon.SinonStub).restore()});

//         it('Retorna todos os times', async () => {
//             chaiResponse = await chai.request(app).get("/teams");
//             // console.log('testeeeeeeee', chaiResponse);
//             // deep compara se e objeto
//             expect(chaiResponse.status).to.equal(http.okStatus);
//             expect(chaiResponse.body).to.deep.equal(teams);
//         });
        
//     });


//     describe('Testando rota /teams/:id usando verbo GET', () => {
//         const team = {
//         id: 1,
//         teamName:' Avaí/Kindermann'
//         }

//         before(async () => {sinon.stub(TeamsModel, "findOne").resolves(team as TeamsModel)});

//         after(() => {(TeamsModel.findOne as sinon.SinonStub).restore()});

//         it('Retorna um time', async () => {
//             chaiResponse = await chai.request(app).get("/teams/1");
//             expect(chaiResponse.status).to.equal(http.okStatus);
//             expect(chaiResponse.body).to.deep.equal(team);
//         });
//     })
// })
