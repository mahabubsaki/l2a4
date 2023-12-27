/* Route content */

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewZodSchema } from './review.schema';
import { reviewPostController } from './review.controller';
import routeGuard from '../../utilities/routeGuard';


const reviewRouter = express.Router();

reviewRouter.post('/', validateRequest(reviewZodSchema), routeGuard('user'), reviewPostController);


export default reviewRouter;