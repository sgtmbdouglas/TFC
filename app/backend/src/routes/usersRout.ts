import { Router } from 'express';
import UserController from '../controllers/usersController';
import tokenValidation from '../middlers/loginOk';
// exemplo de com instancia e sem no controller e no middler

const router = Router();
const user = new UserController();
// -----------GET----------------
router.get('/validate', tokenValidation.tokenValidatiom);
// -----------POST---------------
router.post('/', (req, res) => user.login(req, res));
// -----------PUT----------------

export default router;
