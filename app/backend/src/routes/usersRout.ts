import { Router } from 'express';
import UserController from '../controllers/usersController';

const user = new UserController();
const router = Router();
router.post('/', user.login);

export default router;
