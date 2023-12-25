/* Service content */

import { IReview } from "./review.interface";
import Review from "./review.model";


export const reviewPost = async (payload: IReview): Promise<IReview> => {

    const result = (await Review.create(payload)).toObject();
    return result;
};