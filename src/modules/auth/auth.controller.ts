/* Controller content */

import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IUser } from "../users2/users2.interface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { registerService } from "./auth.service";


export const authRegisterController = catchAsync(async (req: Request, res: Response) => {

    const userData: IUser = req.body;
    const result = await registerService(userData);
    sendResponse<Omit<IUser, 'password'>>(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "User registered successfully"
    });
});