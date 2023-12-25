import mongoose, { Error } from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
    err: mongoose.Error.ValidationError, custom: boolean = false
): TGenericErrorResponse => {

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorDetails: !custom ? Object.entries((err as Error.ValidationError)?.errors)[0][1] : err.errors,
        errorMessage: `${!custom ? (Object.entries((err as Error.ValidationError)?.errors)[0][1].value) : err.errors.value} is not a valid ID!`,
        stack: err.stack,
        success: false
    };
};

export default handleCastError;