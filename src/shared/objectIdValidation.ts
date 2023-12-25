import { RequestHandler } from "express";
import { Types } from "mongoose";

import httpStatus from "http-status";
import AppError from "../errors/AppError";

export const objectIdValidation: RequestHandler = async (req, _, next): Promise<void> => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        const err = new AppError(httpStatus.BAD_REQUEST, "Invalid ObjectID Given");
        next(err);
        return;
    }
    next();
};
