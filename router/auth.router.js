import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignup } from '../middlewares/auth/accountExistsSignup.middleware.js';
import { accoutExistsSignin } from '../middlewares/auth/accountExistsSignin.middleware.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVerified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import passport from '../middlewares/passport.js';
import { token } from 'morgan';

const {signup, signin, signout, googleSignIn} = authController

const router = express.Router();

router.post('/signup', /*validator(validateSignup),*/ accountExistsSignup, signup)

router.post('/signin', /*validator(validateSignup),*/ accoutExistsSignin,accountHasBeenVerified,passwordIsOk,signin)
router.post('/google', googleSignIn)

router.post('/signout',passport.authenticate('jwt', {session: false}) ,signout)

router.post('/token', passport.authenticate('jwt', { session: false}),authController.token)

export default router