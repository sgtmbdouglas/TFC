import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// adicionando a extencao do http ao chai agora posso fazer chai.request(servidor). ele vai rodar esse servidor mocado para testar
// teste de integracao testa algumas partes juntas...todas as partes e o teste end to end
import { app } from '../app';
import userModel from '../database/models/Users';
import { Response } from 'superagent';
import http from '../utils/metodosHttp';

chai.use(chaiHttp);
const { expect } = chai;
const userReturn = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
// testando rotas
describe('Testando rota /login usando verbo POST', () => {
  let chaiRequest: Response;

  before(async () => {
    sinon.stub(userModel, "findOne").resolves(userReturn as userModel);
      // porque nao posso resolver com {{},{}}
  });

  after(()=>{(userModel.findOne as sinon.SinonStub).restore()})

  it("O usuario nao existe no banco", async () => {
    chaiRequest = await chai.request(app).post("/login").send({
      email: "xablau@helloMundo.com",
      password: "123456",
    });
    expect(chaiRequest.status).to.equal(http.unauthorize);
    expect(chaiRequest.body).to.deep.equal({message:"Incorrect email or passwordd"});
  });

  it('O usuario existe no banco', async () => {
    chaiRequest = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password:"secret_admin"
    })
    expect(chaiRequest.status).to.equal(http.okStatus)
    // espera retornar um objeto com o token {'token': "jnbasidfbasiufb"}
  });

  it('Campo email preenchido', async () => {
    chaiRequest = await chai.request(app).post("/login").send({
      email: "",
      password:"secret_admin"
  })
  expect(chaiRequest.status).to.be.equal(http.badRequest);
  expect(chaiRequest.body).to.deep.equal({message:"All fields must be filled"});
  });

  it('Campo password preenchido', async () => {
    chaiRequest = await chai.request(app).post("/login").send({
      email: "admin@admin.com",
      password:""
  })
  expect(chaiRequest.status).to.be.equal(http.badRequest);
  expect(chaiRequest.body).to.deep.equal({message:"All fields must be filled"});
  });
});
