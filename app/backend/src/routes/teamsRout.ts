import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const router = Router();
router.get('/', teamsController.getAll);
export default router;
