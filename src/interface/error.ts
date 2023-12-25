

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorDetails: any;
    success: boolean;
    stack: string | undefined;
    errorMessage: string;
};

export interface IQueryBuilder {
    meta: {
        page: number;
        limit: number;
    };
    sort: {
        [x: string]: number;
    };
    filter: any;
}