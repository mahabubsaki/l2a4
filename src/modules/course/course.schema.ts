import mongoose, { UpdateQuery } from "mongoose";
import { z } from "zod";
import Category from "../category/category.model";
import { ICourse } from "./course.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import dateToWeek from "../../utilities/dateToWeek";
import User2 from "../users2/users2.model";


const courseMongooseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,

        validate: {
            validator: async function (value: mongoose.Schema.Types.ObjectId) {
                try {
                    const category = await Category.findById(value);
                    if (!category) {
                        const error = new mongoose.Error.CastError(
                            'categoryId',
                            value,
                            'Category not found'
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
    price: {
        type: Number,
        required: true,
    },
    tags: [
        {
            _id: false,
            name: {
                type: String,
                required: true,
                _id: false
            },
            isDeleted: {
                type: Boolean,
                default: false,
            },
        }
    ],
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    durationInWeeks: {
        type: Number,
        required: true,
    },
    details: {
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User2',
        required: true,
        validate: {
            validator: async function (value: mongoose.Schema.Types.ObjectId) {
                try {
                    const user = await User2.findById(value);
                    if (!user) {
                        const error = new mongoose.Error.CastError(
                            'createdBy',
                            value,
                            'No User found with this id'
                        );
                        throw error;
                    }
                    return true;
                } catch (err) {
                    throw err;
                }
            },

        }
    }
}, { timestamps: true });

courseMongooseSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const existing = await this.model.findOne(query);
    if (!existing) {
        throw new AppError(404, "No course found with the given id");
    }
    const update = this.getUpdate() as UpdateQuery<ICourse>;
    const startDate = update.$set?.startDate || existing.startDate;
    const endDate = update.$set?.endDate || existing.endDate;

    if (new Date(startDate) > new Date(endDate)) {
        throw new AppError(httpStatus.CONFLICT, 'StartDate cannot be greater than existing EndDate');
    }
    if (update.$set?.startDate || update.$set?.endDate) {
        update.$set.durationInWeeks = dateToWeek(startDate, endDate);
    }

    next();
});


const courseZodSchema = z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(z.object({
        name: z.string(),
        isDeleted: z.boolean(),
    }).strict()).nonempty(),
    durationInWeeks: z.number().optional(),
    startDate: z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value), { message: "Invalid start Date given. Please use the 'YYYY-MM-DD' format." }),
    endDate: z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value), { message: "Invalid start Date given. Please use the 'YYYY-MM-DD' format." }),
    language: z.string(),
    provider: z.string(),
    details: z.object({
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
        description: z.string(),
    }).strict(),
}).strict();

const courseUpdateZodSchema = courseZodSchema.deepPartial().strict();

export {
    courseMongooseSchema,
    courseZodSchema,
    courseUpdateZodSchema
};