import { ErrorRequestHandler } from 'express';


import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TGenericErrorResponse } from '../interface/error';
import { Error } from 'mongoose';


const globalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {

    let error: TGenericErrorResponse = {
        errorMessage: err?.message || "Something went wrong",
        errorDetails: [{ message: err?.message || "Something went wrong", path: "" }],
        message: err?.message || "Something went wrong",
        stack: err.stack,
        statusCode: 500,
        success: false
    };


    if (err?.name === 'ZodError') {
        const simplifiedError = handleZodError(err);
        error = { ...simplifiedError };

    } else if (err?.name === 'CastError' || (err?.errors && Object.entries((err as Error.ValidationError)?.errors)?.[0]?.[1]?.name === 'CastError')) {
        const simplifiedError = handleCastError(err, true);
        error = { ...simplifiedError };
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        error = { ...simplifiedError };
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        error = { ...simplifiedError };
    } else if (err instanceof AppError) {
        error = {
            errorDetails: [{ path: "", message: err.message }],
            errorMessage: err.message, message: err.message,
            stack: err.stack, statusCode: err.statusCode, success: false
        };
    } else if (err instanceof Error) {
        error = {
            errorDetails: [{ path: "", message: err.message }],
            errorMessage: err.message, message: err.message,
            stack: err.stack, statusCode: 400, success: false
        };
    }

    return res.status(error.statusCode).json(error);
};

export default globalErrorHandler;