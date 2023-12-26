import { NextFunction, Request, Response } from "express";

const meRoute = (privateRoute: boolean) => async (req: Request, _: Response, next: NextFunction) => {

    try {
        const user = req.user;
        if (privateRoute) {
            next();
        } {
            next();
        }
    } catch (err) {
        next(err);
    }
};