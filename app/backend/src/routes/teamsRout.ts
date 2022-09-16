import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const router = Router();
// -----------GET----------------
router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getId);
// -----------POST---------------
// -----------PUT----------------
export default router;
