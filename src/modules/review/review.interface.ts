/* Interface content */

import { Model } from "mongoose";


export interface IReview {
    courseId: string;
    rating: number;
    review: string;
}



export interface IReviewMethods {
    demo: () => string;
}

export interface IReviewStatics extends Model<IReview, object, IReviewMethods> {
    demo: () => string;
}