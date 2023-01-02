import { Router } from 'express';
import { signIn, signOut } from '../controllers/auth';
import  {authenticate}  from '../middlewares/authenticate';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-out', authenticate, signOut);

export default router;
