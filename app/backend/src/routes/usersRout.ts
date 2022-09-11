import { Router } from 'express';
import UserController from '../controllers/usersController';
// import validBody from '../middlers/loginOk';
// exemplo de com instancia e sem no controller e no middler

const router = Router();
const user = new UserController();
// -----------GET----------------

// -----------POST---------------
router.post('/', user.login);
// -----------PUT----------------

export default router;
