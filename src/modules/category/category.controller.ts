/* Controller content */

import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ICategory } from "./category.interface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { categoryGet, categoryPost } from "./category.service";

export const categoryPostController = catchAsync(async (req: Request, res: Response) => {

    const userData: ICategory = req.body;
    const result = await categoryPost(userData, req.user._id);
    sendResponse<ICategory>(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "Category created successfully"
    });
});

export const categoryGETController = catchAsync(async (_: Request, res: Response) => {
    const result = await categoryGet();

    sendResponse<ICategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Categories retrieved successfully"
    });
});