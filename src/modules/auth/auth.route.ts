/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZodSchema } from '../users2/users2.schema';
import { authLoginController, authRegisterController } from './auth.controller';
import { loginZodSchema } from './auth.schema';

const authRouter = express.Router();

authRouter.post('/register', validateRequest(userZodSchema), authRegisterController);
authRouter.post('/login', validateRequest(loginZodSchema), authLoginController);

export default authRouter;