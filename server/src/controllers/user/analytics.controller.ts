import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import _response from "@utils/response.util";
import { db } from "@config/db";
import client from "@config/redis";

export const getAllTransactionsAnalytics = asyncHandler(async (req: Request, res: Response) => {
    const cacheKey = "all_transactions_analytics";

    // 1️⃣ Try to get from Redis first
    const cached = await client.get(cacheKey);
    if (cached) {
        return _response(res, 200, true, JSON.parse(cached), "Analytics fetched from cache");
    }

    const { id } = req.session;
    if (!id) {
        return _response(res, 404, false, {}, "id not found");
    }

    const transactions = await db.transaction.findMany({
        where: { userId: Number(id) },
        include: { user: true },
    });

    if (!transactions || transactions.length === 0) {
        return _response(res, 200, true, { transactions: [], category: {}, monthlyTrends: [] }, "No transactions found");
    }

    const incomeMap: Record<string, number> = {};
    const expenseMap: Record<string, number> = {};
    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((txn:any) => {
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

    // 2️⃣ Save result to Redis for 15 minutes (900 seconds)
    await client.setEx(cacheKey, 900, JSON.stringify(responseData));

    return _response(res, 200, true, responseData, "Analytics for all users fetched successfully");
});
