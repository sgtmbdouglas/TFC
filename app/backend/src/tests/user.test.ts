import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// adicionando a extencao do http ao chai agora posso fazer chai.request(servidor). ele vai rodar esse servidor mocado para testar
// teste de integracao testa algumas partes juntas...todas as partes e o teste end to end
import { app } from '../app';
import userModel from '../database/models/Users';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;
const userReturn = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

describe('Testando rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(userModel, "findOne").resolves(userReturn as userModel);
      // porque nao posso resolver com {{},{}}
  });

  after(()=>{(userModel.findOne as sinon.SinonStub).restore()})

  it('O usuario existe', async () => {
    chaiHttpResponse = await chai.request(app).post("/login").send({
        "email": "admin@admin.com",
        "password":"secret_admin"
    })
    expect(chaiHttpResponse.status).to.equal(200)
  });
});
