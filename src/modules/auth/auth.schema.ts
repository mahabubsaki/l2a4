/* Schema content */

import { z } from "zod";
import { userZodSchema } from "../users2/users2.schema";

const loginZodSchema = userZodSchema.pick({ username: true, password: true });
const changePassZodSchema = z.object({
    currentPassword: z.string({
        required_error: 'Old password required'
    }),
    newPassword: z.string({
        required_error: 'New password required'
    }).min(6, { message: "Need minimum of 6 characters for password" }).max(50, { message: "Need maximum of 20 characters for password" }),
}).strict();

export {
    loginZodSchema,
    changePassZodSchema
};