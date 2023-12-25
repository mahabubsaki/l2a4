import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const message = 'Validation Error';
    const errorMessage = err.issues.map(i => `${i.path[i.path.length - 1]} is ${i.message}`).join(" . ");
    const errorDetails = err;

    const statusCode = 400;

    const stack = err.stack;
    const success = false;
    const error: TGenericErrorResponse = {
        errorDetails,
        errorMessage,
        message,
        stack,
        statusCode,
        success
    };
    return error;
};

export default handleZodError;