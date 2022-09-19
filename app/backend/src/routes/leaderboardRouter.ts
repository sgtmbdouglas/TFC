import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const router = Router();
// -----------GET----------------
router.get('/home', leaderboardController.getAllHome);
// -----------POST---------------
// -----------PUT----------------
export default router;
