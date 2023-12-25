/* Model content */

import { model } from "mongoose";
import { IUser, IUserStatics } from "./users2.interface";
import { userMongooseSchema } from "./users2.schema";

const User2 = model<IUser, IUserStatics>('User2', userMongooseSchema, 'users2');

export default User2;