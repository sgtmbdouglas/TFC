import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const router = Router();
router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getId);
export default router;
