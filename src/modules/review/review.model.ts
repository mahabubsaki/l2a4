/* Model content */

import { model } from "mongoose";
import { IReview, IReviewStatics } from "./review.interface";
import { reviewMongooseSchema } from "./review.schema";


const Review = model<IReview, IReviewStatics>('Review', reviewMongooseSchema, 'reviews');
export default Review;