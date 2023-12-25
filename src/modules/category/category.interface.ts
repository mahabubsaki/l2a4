/* Interface content */

import { Model } from "mongoose";


export interface ICategory {
    name: string;
}

export interface ICategoryMethods {
    demo: () => string;
}

export interface ICategoryStatics extends Model<ICategory, object, ICategoryMethods> {
    demo: () => string;
}
