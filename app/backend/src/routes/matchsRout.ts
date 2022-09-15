import { Router } from 'express';
import matchesController from '../controllers/matchsController';

const router = Router();
router.get('/', matchesController.getAll);
export default router;
