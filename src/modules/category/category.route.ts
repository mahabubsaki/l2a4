/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryZodSchema } from './category.schema';
import { categoryGETController, categoryPostController } from './category.controller';


const categoryRouter = express.Router();

categoryRouter.post('/', validateRequest(categoryZodSchema), categoryPostController);
categoryRouter.get('/', categoryGETController);

export default categoryRouter;