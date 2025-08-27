import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import _response from "@utils/response.util";
import { db } from "@config/db";

/**
 * Get analytics for all users combined
 */
export const getAllTransactionsAnalytics = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await db.transaction.findMany({
        include: { user: true }, // optional: include user info
    });

    if (!transactions || transactions.length === 0) {
        return _response(res, 200, true, { transactions: [], category: {}, monthlyTrends: [] }, "No transactions found");
    }

    // 🥧 Category analytics
    const incomeMap: Record<string, number> = {};
    const expenseMap: Record<string, number> = {};

    // 📈 Monthly trends
    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((txn) => {
        // Category breakdown
        if (txn.type === "INCOME") {
            incomeMap[txn.category] = (incomeMap[txn.category] || 0) + txn.amount;
        } else if (txn.type === "EXPENSE") {
            expenseMap[txn.category] = (expenseMap[txn.category] || 0) + txn.amount;
        }

        // Monthly trends
        const month = new Date(txn.date).toLocaleString("default", {
            month: "short",
            year: "numeric",
        });

        if (!monthlyMap[month]) {
            monthlyMap[month] = { income: 0, expense: 0 };
        }
        monthlyMap[month][txn.type.toLowerCase() as "income" | "expense"] += txn.amount;
    });

    // Convert to arrays
    const category = {
        income: Object.entries(incomeMap).map(([category, total]) => ({
            category,
            total,
        })),
        expense: Object.entries(expenseMap).map(([category, total]) => ({
            category,
            total,
        })),
    };

    const monthlyTrends = Object.entries(monthlyMap).map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
    }));

    return _response(
        res,
        200,
        true,
        {
            category,
            monthlyTrends,
            transactions,
        },
        "Analytics for all users fetched successfully"
    );
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

    const user = await db.user.findFirst({
        where: {
            id: Number(userId),
        },
        include: {
            transactions: true,
        },
    });

    if (!user) {
        return _response(res, 404, false, {}, "User not found");
    }

    // --- Category analytics ---
    const incomeMap: Record<string, number> = {};
    const expenseMap: Record<string, number> = {};

    // --- Monthly trends ---
    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    user.transactions.forEach((txn) => {
        const month = txn.date.toLocaleString("default", { month: "short", year: "numeric" });

        if (!monthlyMap[month]) {
            monthlyMap[month] = { income: 0, expense: 0 };
        }

        if (txn.type === "INCOME") {
            incomeMap[txn.category] = (incomeMap[txn.category] || 0) + txn.amount;
            monthlyMap[month].income += txn.amount;
        } else if (txn.type === "EXPENSE") {
            expenseMap[txn.category] = (expenseMap[txn.category] || 0) + txn.amount;
            monthlyMap[month].expense += txn.amount;
        }
    });

    // Convert maps into arrays
    const category = {
        income: Object.entries(incomeMap).map(([category, total]) => ({ category, total })),
        expense: Object.entries(expenseMap).map(([category, total]) => ({ category, total })),
    };

    const monthlyTrends = Object.entries(monthlyMap).map(([month, { income, expense }]) => ({
        month,
        income,
        expense,
    }));

    return _response(
        res,
        200,
        true,
        {
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
            monthlyTrends,   // 👈 new field
            transactions: user.transactions,
        },
        "User with analytics fetched successfully"
    );
});
