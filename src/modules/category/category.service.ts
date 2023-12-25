/* Service content */

import { ICategory } from "./category.interface";
import Category from "./category.model";


export const categoryPost = async (payload: ICategory): Promise<ICategory> => {
    const result = (await Category.create(payload)).toObject();
    return result;
};

export const categoryGet = async (): Promise<ICategory[]> => {
    const result = await Category.find({});
    return result;
};