import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import _response from "@utils/response.util";
import { db } from "@config/db";

/**
 * Get transaction by Users id
 */
export const getTransactionByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.session;

    const transactions = await db.transaction.findMany({
        where: {
            userId: Number(id)
        },
        include: {
            user: true
        }
    });

    if (!transactions) {
        return _response(res, 200, false, {}, "transactions not found");
    }

    return _response(
        res,
        200,
        true,
        { transactions },
        "transactions fetched success"
    );
});

/**
 * create transaction
 */
export const createTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.session;

    if (!id) {
        return _response(res, 404, false, {}, "User id is required");
    }

    const { type, amount, category, description, date } = req.body;

    const transaction = await db.transaction.create({
        data: {
            type,
            amount: Number(amount),
            category,
            description,
            date: new Date(date),
            userId: Number(id)
        },
    });

    if (!transaction) {
        return _response(res, 200, false, {}, "Something went wrong");
    }

    return _response(
        res,
        200,
        true,
        { transaction },
        "Transaction created successfully"
    );
});

/**
 * Update transaction
 */
export const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, amount, category, description, date } = req.body;

    const transaction = await db.transaction.update({
        where: { id: Number(id) },
        data: {
            type,
            amount: Number(amount),
            category,
            description,
            date: new Date(date),
        },
    });

    if (!transaction) {
        return _response(res, 200, false, {}, "Something went wrong");
    }

    return _response(
        res,
        200,
        true,
        { transaction },
        "transaction updated successfully"
    );
});

/**
 * delete transaction
 */
export const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const transaction = await db.transaction.delete({
        where: { id: Number(id) },
    });

    if (!transaction) {
        return _response(res, 200, false, {}, "Something went wrong");
    }

    return _response(
        res,
        200,
        true,
        { transaction },
        "transaction deleted successfully"
    );
});
