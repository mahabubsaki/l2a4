import mongoose from "mongoose";
import { z } from "zod";


const categoryMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

});


const categoryZodSchema = z.object({
    name: z.string()
}).strict();

export {
    categoryMongooseSchema,
    categoryZodSchema
};