import { Schema } from "mongoose";
import { IUser } from "./users2.interface";
import { z } from "zod";

const userMongooseSchema = new Schema<IUser>(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    { timestamps: true }
);


const userZodSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6, { message: "Need minimum of 6 characters for password" }).max(50, { message: "Need maximum of 20 characters for password" }),
    role: z.enum(['user', 'admin']).default('user'),
}).strict();

export {
    userMongooseSchema,
    userZodSchema
};