/* Service content */

import { IUser } from "../users2/users2.interface";
import User2 from "../users2/users2.model";


export const registerService = async (payload: IUser): Promise<Omit<IUser, 'password'>> => {
    const { password, ...result } = (await User2.create(payload)).toObject();
    return result;
};

export const loginService = async (payload: Pick<IUser, 'username' | 'password'>): Promise<IUser> => {

    return {} as IUser;
};