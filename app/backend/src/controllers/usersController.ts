import { Request, Response } from 'express';
import UsersService from '../services/usersService';

export default class UserController {
  // metodo estatico = nao pertence a instacia da classe, intancia quando coloca o new class, posso chamar a funcao direto
  // linter reclama sem o this se eu usar public e vou prescisar instanciar para usar na rota
  message1 = { message: 'All fields must be filledd' };
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(this.message1);
    }
    const token = await UsersService.login(email, password);
    if (token) {
      return res.status(200).json(token);
    }
    return res.status(401).json({ message: 'Incorrect email or passwordd' });
  }
}
// o super seria se eu fosse usar uma superclasse
