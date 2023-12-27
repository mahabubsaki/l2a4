/* Service content */

import { Types } from "mongoose";
import { ICategory } from "./category.interface";
import Category from "./category.model";


export const categoryPost = async (payload: ICategory, userId: Types.ObjectId): Promise<ICategory> => {
    payload.createdBy = userId;
    const result = (await Category.create(payload)).toObject();
    return result;
};

export const categoryGet = async (): Promise<ICategory[]> => {
    const result = await Category.find({}).populate('createdBy', { password: 0, passwordHistory: 0 });
    return result;
};