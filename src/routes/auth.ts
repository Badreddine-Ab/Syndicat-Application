import { Router } from 'express';
import { login,signout } from '../controllers/auth';
import  {authenticate}  from '../middlewares/authenticate';
import { Application } from 'express';

import express from 'express'


const router: Router = express.Router();


router.post('/sign-in', login);
router.post('/sign-out',  signout);


export default router;
