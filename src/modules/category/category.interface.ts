/* Interface content */

import { Model, Types } from "mongoose";


export interface ICategory {
    name: string;
    createdBy: Types.ObjectId;
}

export interface ICategoryMethods {
    demo: () => string;
}

export interface ICategoryStatics extends Model<ICategory, object, ICategoryMethods> {
    demo: () => string;
}
