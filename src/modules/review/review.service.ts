/* Service content */

import { Types } from "mongoose";
import { IReview } from "./review.interface";
import Review from "./review.model";


export const reviewPost = async (payload: IReview, userId: Types.ObjectId): Promise<IReview> => {
    payload.createdBy = userId;
    const result = (await Review.create(payload));
    const populatedResult = await Review.findById(result._id).populate('createdBy', { password: 0, passwordHistory: 0 });
    return populatedResult as IReview;
};