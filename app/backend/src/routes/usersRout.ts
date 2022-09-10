import { Router } from 'express';
import UserController from '../controllers/usersController';
import validBody from '../middlers/loginOk';

const router = Router();
const user = new UserController();
// com instancia e sem
// -----------GET----------------

// -----------POST---------------
router.post('/', validBody.validation, user.login);
// -----------PUT----------------

export default router;
