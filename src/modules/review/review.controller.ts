/* Controller content */

import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IReview } from "./review.interface";
import { reviewPost } from "./review.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";


export const reviewPostController = catchAsync(async (req: Request, res: Response) => {

    const reviewData: IReview = req.body;
    const result = await reviewPost(reviewData, req.user._id);
    sendResponse<IReview>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Course created successfully"
    });
});