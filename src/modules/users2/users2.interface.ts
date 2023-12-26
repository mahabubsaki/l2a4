import { JwtPayload } from "jsonwebtoken";
import { Model, Types } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    passwordHistory: {
        password: string;
        timestamp: Date;
    }[];
}

export interface IJwtPayload extends JwtPayload, Omit<IUser, 'username'> {
    _id: Types.ObjectId;
}
export interface IUserMethods {
    demo: () => string;
}

export interface IUserStatics extends Model<IUser, object, IUserMethods> {
    demo: () => string;
}