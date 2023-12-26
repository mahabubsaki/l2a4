/* Service content */

import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import jwtTokenCreator from "../../utilities/jwtTokenCreator";
import { passwordHasher } from "../../utilities/passwordHasher";
import { passwordMatcher } from "../../utilities/passwordMatcher";
import { IUser } from "../users2/users2.interface";
import User2 from "../users2/users2.model";


export const registerService = async (payload: IUser): Promise<Omit<IUser, 'password' | 'passwordHistory'>> => {
    const { password, passwordHistory, ...result } = (await User2.create({ ...payload, passwordHistory: [{ password: payload.password, timestamp: Date.now() }] })).toObject();
    return result;
};

export const loginService = async (payload: Pick<IUser, 'username' | 'password'>): Promise<{ user: Omit<IUser, 'password'>, token: string; }> => {
    const { password, username } = payload;
    const user = await User2.findOne({ username }).select({ createdAt: 0, updatedAt: 0, __v: 0 });
    if (!user) {
        throw new AppError(404, "User not found with the given username");
    }
    const matched = await passwordMatcher(password, user.password);

    if (!matched) {
        throw new AppError(401, "Password is not correct");
    }
    const token = jwtTokenCreator(user._id.toString(), user.role, user.email);
    const { password: _, ...userWithoutpassword } = user.toObject();
    return { user: userWithoutpassword, token };
};


export const passChangeService = async (payload: { currentPassword: string, newPassword: string; }, hashedPassword: string, userID: Types.ObjectId): Promise<Omit<IUser, 'password'>> => {
    const { currentPassword, newPassword } = payload;

    const matched = await passwordMatcher(currentPassword, hashedPassword);
    if (!matched) {
        throw new AppError(401, "Password is not correct");
    }
    const newHashedPassword = await passwordHasher(newPassword);
    const updatedUser = await User2.findByIdAndUpdate(userID.toString(), { $set: { password: newHashedPassword } }, { new: true });
    const { password, ...updatedUserWithoutPass } = updatedUser?.toObject() as IUser;
    return updatedUserWithoutPass;
};