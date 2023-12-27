/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseUpdateZodSchema, courseZodSchema } from './course.schema';
import { courseBestGETController, courseGETController, coursePUTController, coursePostController, courseWithReviewGETController } from './course.controller';
import routeGuard from '../../utilities/routeGuard';


const courseRouter = express.Router();

courseRouter.post('/courses', validateRequest(courseZodSchema), routeGuard('admin'), coursePostController);
courseRouter.get('/courses', courseGETController);
courseRouter.get('/course/best', courseBestGETController);
courseRouter.get('/courses/:courseId/reviews', courseWithReviewGETController);
courseRouter.put('/courses/:courseId', validateRequest(courseUpdateZodSchema), routeGuard('admin'), coursePUTController);



export default courseRouter;