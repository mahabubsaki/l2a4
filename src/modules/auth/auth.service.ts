/* Service content */

import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import jwtTokenCreator from "../../utilities/jwtTokenCreator";
import { passwordHasher } from "../../utilities/passwordHasher";
import { passwordMatcher } from "../../utilities/passwordMatcher";
import { IUser } from "../users2/users2.interface";
import User2 from "../users2/users2.model";
import { format } from "date-fns";


export const registerService = async (payload: IUser): Promise<Omit<IUser, 'password' | 'passwordHistory'>> => {
    const { password, passwordHistory, ...result } = (await User2.create({ ...payload, passwordHistory: [{ password: payload.password, timestamp: Date.now() }] })).toObject();
    return result;
};

export const loginService = async (payload: Pick<IUser, 'username' | 'password'>): Promise<{ user: Omit<IUser, 'password' | 'passwordHistory'>, token: string; }> => {
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
    const { password: _, passwordHistory: __, ...userWithoutpassword } = user.toObject();
    return { user: userWithoutpassword, token };
};


export const passChangeService = async (payload: { currentPassword: string, newPassword: string; }, hashedPassword: string, userID: Types.ObjectId, history: {
    password: string;
    timestamp: Date;
}[]): Promise<Omit<IUser, 'password' | 'passwordHistory'>> => {
    const { currentPassword, newPassword } = payload;

    const matched = await passwordMatcher(currentPassword, hashedPassword);
    if (!matched) {
        throw new AppError(401, "Password is not correct");
    }
    if (history.some(each => each.password === newPassword)) {
        throw new AppError(400, `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${format(history.find(each => each.password === newPassword)?.timestamp as Date, 'PPPPp')}).`);
    }
    const newHistory = [...history, { password: newPassword, timestamp: new Date() }];
    const newHashedPassword = await passwordHasher(newPassword);
    const updatedUser = await User2.findByIdAndUpdate(userID.toString(), { $set: { password: newHashedPassword, passwordHistory: newHistory.slice(-3) } }, { new: true, runValidators: true });
    const { password, passwordHistory, ...updatedUserWithoutPass } = updatedUser?.toObject() as IUser;
    return updatedUserWithoutPass;
};