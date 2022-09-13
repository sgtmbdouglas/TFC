import { Request, Response } from 'express';
// import { Iuser } from 'src/Interfaces/Iuser';
import UsersService from '../services/usersService';
import http from '../utils/metodosHttp';

export interface Iuser {
  id: number;
  email: string;
}

export default class UserController {
  // metodo estatico = nao pertence a instacia da classe, intancia quando coloca o new class, posso chamar a funcao direto
  // linter reclama sem o this se eu usar public e vou prescisar instanciar para usar na rota
  message1 = { message: 'All fields must be filled' };
  message2 = { message: 'Incorrect email or password' };
  // para nao usar arrow func na rota por conta da classe com express da problema
  // constructor() {
  //   this.login = this.login.bind(this);
  // }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UsersService.login(email, password);

    if (!email || !password) {
      return res.status(http.badRequest).json(this.message1);
    }

    if (token) {
      return res.status(http.okStatus).json(token);
    }
    return res.status(http.unauthorize).json(this.message2);
  }
}
// o super seria se eu fosse usar uma superclasse
