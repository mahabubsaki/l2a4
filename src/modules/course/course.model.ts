import { model } from "mongoose";
import { ICourse, ICourseStatics } from "./course.interface";
import { courseMongooseSchema } from "./course.schema";



const Course = model<ICourse, ICourseStatics>('Course', courseMongooseSchema, 'courses');

export default Course;