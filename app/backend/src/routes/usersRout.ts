import { Router } from 'express';
import UsersController from '../controllers/usersController';
import tokenValidation from '../middlers/loginOk';
// exemplo de com instancia e sem no controller e no middler

const router = Router();
const user = new UsersController();
// -----------GET----------------
router.get('/validate', tokenValidation.tokenValidatiom);
// -----------POST---------------
router.post('/', (req, res) => user.login(req, res));
// -----------PUT----------------

export default router;
