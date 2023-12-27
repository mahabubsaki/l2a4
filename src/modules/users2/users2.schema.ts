import { Schema } from "mongoose";
import { IUser } from "./users2.interface";
import { z } from "zod";
import { passwordHasher } from "../../utilities/passwordHasher";

const userMongooseSchema = new Schema<IUser>(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, min: [6, 'Need minimum of 6 characters for password'], max: [50, "Need maximum of 20 characters for password"] },
        passwordHistory: {
            type: [
                {
                    password: { type: String, required: true },
                    timestamp: { type: Date, default: Date.now },
                },
            ],
            required: true,
            _id: false
        },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    { timestamps: true }
);

userMongooseSchema.pre('save', async function (next) {
    try {


        this.password = await passwordHasher(this.password);


        next();
    } catch (error) {
        if (error instanceof Error) {
            next(error);
        }
    }
});




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