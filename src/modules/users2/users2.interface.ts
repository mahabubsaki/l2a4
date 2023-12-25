import { Model } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}


export interface IUserMethods {
    demo: () => string;
}

export interface IUserStatics extends Model<IUser, object, IUserMethods> {
    demo: () => string;
}