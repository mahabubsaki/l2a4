import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
    err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
    const errorSources = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorDetails: errorSources,
        errorMessage: errorSources.map(i => i.message).join(" . "),
        stack: err.stack,
        success: false
    };
};

export default handleValidationError;