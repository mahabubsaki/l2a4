import { TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Duplicate ID',
        errorDetails: errorSources,
        errorMessage: errorSources[0].message,
        stack: err?.stack,
        success: false
    };
};

export default handleDuplicateError;