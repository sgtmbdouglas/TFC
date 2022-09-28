import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const router = Router();
// -----------GET----------------
router.get('/home', leaderboardController.getAllHome);
router.get('/away', leaderboardController.getAllAway);
router.get('/', leaderboardController.getAll);
// -----------POST---------------
// -----------PUT----------------
export default router;
