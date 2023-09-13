import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignup } from '../middlewares/auth/accountExistsSignup.middleware.js';
import { accoutExistsSignin } from '../middlewares/auth/accountExistsSignin.middleware.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVerified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import passport from '../middlewares/passport.js';

const {signup, signin, signout} = authController

const router = express.Router();

router.post('/signup', /*validator(validateSignup),*/ accountExistsSignup, signup)

router.post('/signin', /*validator(validateSignup),*/ accoutExistsSignin,accountHasBeenVerified,passwordIsOk,signin)

router.post('/signout',passport.authenticate('jwt', {session: false}) ,signout)

export default router