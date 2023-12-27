/* Interface content */

import { Model, Types } from "mongoose";


export interface IReview {
    courseId: string;
    rating: number;
    review: string;
    createdBy: Types.ObjectId;
}



export interface IReviewMethods {
    demo: () => string;
}

export interface IReviewStatics extends Model<IReview, object, IReviewMethods> {
    demo: () => string;
}