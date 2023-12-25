/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZodSchema } from '../users2/users2.schema';

const authRouter = express.Router();

authRouter.post('/register', validateRequest(userZodSchema),);

export default authRouter;