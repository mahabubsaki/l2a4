/* Controller content */

import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IUser } from "../users2/users2.interface";
import sendResponse from "../../shared/sendResponse";
import { loginService, passChangeService, registerService } from "./auth.service";


export const authRegisterController = catchAsync(async (req: Request, res: Response) => {

    const userData: IUser = req.body;
    const result = await registerService(userData);
    sendResponse<Omit<IUser, 'password' | 'passwordHistory'>>(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "User registered successfully"
    });
});


export const authLoginController = catchAsync(async (req: Request, res: Response) => {

    const userData: Pick<IUser, 'username' | 'password'> = req.body;
    const result = await loginService(userData);
    sendResponse<{ user: Omit<IUser, 'password' | 'passwordHistory'>, token: string; }>(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "User login successful"
    });
});


export const authPassChangeController = catchAsync(async (req: Request, res: Response) => {

    const userData: { currentPassword: string, newPassword: string; } = req.body;
    const result = await passChangeService(userData, req.user.password, req.user._id, req.user.passwordHistory);
    sendResponse<Omit<IUser, 'password' | 'passwordHistory'>>(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Password changed successfully"
    });
});

