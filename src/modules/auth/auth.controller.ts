/* Controller content */

import catchAsync from "../../shared/catchAsync";


export const authRegisterController = catchAsync(async (req: Request, res: Response) => {

    const userData: IU = req.body;
    const result = await categoryPost(userData);
    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Categories retrieved successfully"
    });
});