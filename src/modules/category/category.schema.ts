import mongoose from "mongoose";
import { z } from "zod";
import User2 from "../users2/users2.model";


const categoryMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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


const categoryZodSchema = z.object({
    name: z.string()
}).strict();

export {
    categoryMongooseSchema,
    categoryZodSchema
};