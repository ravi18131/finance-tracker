import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import _response from "@utils/response.util";
import { db } from "@config/db";
import client from "@config/redis";

/**
 * Get analytics for all users combined
 */
export const getAllTransactionsAnalytics = asyncHandler(async (req: Request, res: Response) => {
    const cacheKey = "admin_all_transactions_analytics";

    // 1️⃣ Try to get cached data
    const cached = await client.get(cacheKey);
    if (cached) {
        return _response(res, 200, true, JSON.parse(cached), "Analytics fetched from cache");
    }

    // 2️⃣ Fetch from DB if cache miss
    const transactions = await db.transaction.findMany({
        include: { user: true },
    });

    if (!transactions || transactions.length === 0) {
        return _response(res, 200, true, { transactions: [], category: {}, monthlyTrends: [] }, "No transactions found");
    }

    const incomeMap: Record<string, number> = {};
    const expenseMap: Record<string, number> = {};
    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((txn) => {
        if (txn.type === "INCOME") incomeMap[txn.category] = (incomeMap[txn.category] || 0) + txn.amount;
        else if (txn.type === "EXPENSE") expenseMap[txn.category] = (expenseMap[txn.category] || 0) + txn.amount;

        const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" });
        if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };
        monthlyMap[month][txn.type.toLowerCase() as "income" | "expense"] += txn.amount;
    });

    const category = {
        income: Object.entries(incomeMap).map(([category, total]) => ({ category, total })),
        expense: Object.entries(expenseMap).map(([category, total]) => ({ category, total })),
    };

    const monthlyTrends = Object.entries(monthlyMap).map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
    }));

    const responseData = { category, monthlyTrends, transactions };

    // 3️⃣ Cache result for 15 minutes (900 seconds)
    await client.setEx(cacheKey, 900, JSON.stringify(responseData));

    return _response(res, 200, true, responseData, "Analytics for all users fetched successfully");
});

/**
 * Get analytics by Users id
 */
export const getUserWithAnalyticsByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await db.user.findFirst({
        where: {
            id: Number(userId)
        },
        include: {
            transactions: true
        }
    });

    if (!user) {
        return _response(res, 200, false, {}, "user not found");
    }

    return _response(
        res,
        200,
        true,
        { user },
        "user fetched success"
    );
});

/**
 * Get analytics by User id (with monthly trends)
 */
export const getUserWithAnalyticsCategoryByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const cacheKey = `user_analytics_${userId}`;

    // 1️⃣ Try cache first
    const cached = await client.get(cacheKey);
    if (cached) {
        return _response(res, 200, true, JSON.parse(cached), "User analytics fetched from cache");
    }

    // 2️⃣ Fetch from DB if cache miss
    const user = await db.user.findFirst({
        where: { id: Number(userId) },
        include: { transactions: true },
    });

    if (!user) return _response(res, 404, false, {}, "User not found");

    const incomeMap: Record<string, number> = {};
    const expenseMap: Record<string, number> = {};
    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    user.transactions.forEach((txn) => {
        const month = txn.date.toLocaleString("default", { month: "short", year: "numeric" });
        if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };

        if (txn.type === "INCOME") {
            incomeMap[txn.category] = (incomeMap[txn.category] || 0) + txn.amount;
            monthlyMap[month].income += txn.amount;
        } else if (txn.type === "EXPENSE") {
            expenseMap[txn.category] = (expenseMap[txn.category] || 0) + txn.amount;
            monthlyMap[month].expense += txn.amount;
        }
    });

    const category = {
        income: Object.entries(incomeMap).map(([category, total]) => ({ category, total })),
        expense: Object.entries(expenseMap).map(([category, total]) => ({ category, total })),
    };

    const monthlyTrends = Object.entries(monthlyMap).map(([month, { income, expense }]) => ({
        month,
        income,
        expense,
    }));

    const responseData = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isBlocked: user.isBlocked,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        category,
        monthlyTrends,
        transactions: user.transactions,
    };

    // 3️⃣ Cache for 15 minutes
    await client.setEx(cacheKey, 900, JSON.stringify(responseData));

    return _response(res, 200, true, responseData, "User with analytics fetched successfully");
});

