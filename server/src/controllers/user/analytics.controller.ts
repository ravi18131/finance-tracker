import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import _response from "@utils/response.util";
import { db } from "@config/db";

/**
 * Get analytics for all users combined
 */
export const getAllTransactionsAnalytics = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.session;

    if (!id) {
        return _response(res, 404, false, {}, "id not found");
    }

    const transactions = await db.transaction.findMany({
        where: {
            userId: Number(id)
        },
        include: { user: true },
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
