/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZodSchema } from '../users2/users2.schema';
import { authRegisterController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/register', validateRequest(userZodSchema), authRegisterController);

export default authRouter;