/* Route content */

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewZodSchema } from './review.schema';
import { reviewPostController } from './review.controller';


const reviewRouter = express.Router();

reviewRouter.post('/', validateRequest(reviewZodSchema), reviewPostController);


export default reviewRouter;