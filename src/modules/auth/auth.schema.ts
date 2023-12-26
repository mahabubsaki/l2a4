/* Schema content */

import { userZodSchema } from "../users2/users2.schema";

const loginZodSchema = userZodSchema.pick({ username: true, password: true });


export {
    loginZodSchema
};