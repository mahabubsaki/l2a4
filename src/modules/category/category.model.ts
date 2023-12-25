/* Model content */

import { model } from "mongoose";
import { ICategory, ICategoryStatics } from "./category.interface";
import { categoryMongooseSchema } from "./category.schema";

const Category = model<ICategory, ICategoryStatics>('Category', categoryMongooseSchema, 'categories');
export default Category;