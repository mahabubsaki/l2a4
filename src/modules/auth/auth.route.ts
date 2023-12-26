/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZodSchema } from '../users2/users2.schema';
import { authLoginController, authPassChangeController, authRegisterController } from './auth.controller';
import { changePassZodSchema, loginZodSchema } from './auth.schema';
import routeGuard from '../../utilities/routeGuard';

const authRouter = express.Router();

authRouter.post('/register', validateRequest(userZodSchema), authRegisterController);
authRouter.post('/login', validateRequest(loginZodSchema), authLoginController);
authRouter.post('/change-password', validateRequest(changePassZodSchema), routeGuard(), authPassChangeController);

export default authRouter;