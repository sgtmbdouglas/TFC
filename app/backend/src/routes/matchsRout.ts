import { Router } from 'express';
import matchesController from '../controllers/matchsController';
import tokenValidation from '../middlers/matchesValid';

const router = Router();
// -----------GET----------------
router.get('/', matchesController.getAll);
// -----------POST---------------
router.post('/', tokenValidation.tokenValidatiom, matchesController.postMatch);
// -----------PUT----------------
export default router;
