/* Route content */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseUpdateZodSchema, courseZodSchema } from './course.schema';
import { courseBestGETController, courseGETController, coursePUTController, coursePostController, courseWithReviewGETController } from './course.controller';


const courseRouter = express.Router();

courseRouter.post('/course', validateRequest(courseZodSchema), coursePostController);
courseRouter.get('/courses', courseGETController);
courseRouter.get('/course/best', courseBestGETController);
courseRouter.get('/courses/:courseId/reviews', courseWithReviewGETController);
courseRouter.put('/courses/:courseId', validateRequest(courseUpdateZodSchema), coursePUTController);



export default courseRouter;