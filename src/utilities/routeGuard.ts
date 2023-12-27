import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwtTokenVerify from "./jwtTokenVerify";
import User2 from "../modules/users2/users2.model";

const routeGuard = (...roles: string[]) => async (req: Request, _: Response, next: NextFunction) => {

    try {
        const token = req?.headers?.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        const verifiedUser = jwtTokenVerify(token as string);
        const validUser = await User2.findById(verifiedUser._id, { role: 1, email: 1, password: 1, passwordHistory: 1 });
        if (!validUser) {
            throw new AppError(httpStatus.NOT_FOUND, "User not exist");
        }

        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "You do not have the necessary permissions to access this resource.");
        }
        req.user = validUser;
        next();
    } catch (err) {

        next(err);
    }
};
export default routeGuard;