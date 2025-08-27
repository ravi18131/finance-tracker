import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import _response from "@utils/response.util";
import { db } from "@config/db";

/**
 * Get All Users
 */
export const getAllUser = asyncHandler(async (req: Request, res: Response) => {

    const users = await db.user.findMany({});

    if (!users) {
        return _response(res, 200, false, {}, "Users not found");
    }

    return _response(
        res,
        200,
        true,
        { users },
        "users fetched success"
    );
});

/**
 * Update status Users
 */
export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { is_blocked } = req.body;

    const user = await db.user.update({
        where: { id: Number(id) },
        data: {
            isBlocked: is_blocked,
        },
    });

    if (!user) {
        return _response(res, 200, false, {}, "Something went wrong");
    }

    return _response(
        res,
        200,
        true,
        { user },
        "Status updated successfully"
    );
});
