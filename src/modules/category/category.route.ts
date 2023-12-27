/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryZodSchema } from './category.schema';
import { categoryGETController, categoryPostController } from './category.controller';
import routeGuard from '../../utilities/routeGuard';


const categoryRouter = express.Router();

categoryRouter.post('/', validateRequest(categoryZodSchema), routeGuard('admin'), categoryPostController);
categoryRouter.get('/', categoryGETController);

export default categoryRouter;