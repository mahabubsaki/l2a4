/* Schema content */


import mongoose from "mongoose";
import { z } from "zod";
import Course from "../course/course.model";


const reviewMongooseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,

        validate: {
            validator: async function (value: mongoose.Schema.Types.ObjectId) {
                try {
                    const category = await Course.findById(value);
                    if (!category) {
                        const error = new mongoose.Error.CastError(
                            'courseId',
                            value,
                            'Course not found'
                        );
                        throw error;
                    }
                    return true;
                } catch (err) {
                    throw err;
                }
            },

        }

    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});


const reviewZodSchema = z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string()
}).strict();

export {
    reviewMongooseSchema,
    reviewZodSchema
};