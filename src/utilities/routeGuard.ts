import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwtTokenVerify from "./jwtTokenVerify";

const routeGuard = (...roles: string[]) => async (req: Request, _: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        const verifiedUser = jwtTokenVerify(token as string);
        req.user = verifiedUser;
        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "you do not have access to this");
        }
        next();
    } catch (err) {
        next(err);
    }
};
export default routeGuard;