import express from "express";
import authRouter from "@routes/auth/index.routes";
import { protect, authorize } from "@middlewares/auth.middleware";
import usersRouter from "./admin/user.routes";
import transactionRouter from "./admin/transaction.routes";
import analyticsRouter from "./admin/analytics.routes";
import userTransactionRouter from "./user/transaction.routes";
import userAnalyticsRouter from "./user/analytics.routes";
import { analyticsLimiter, authLimiter, transactionLimiter } from "@middlewares/rateLimiter.middleware";

const router = express.Router();

// Health check
//@ts-ignore
router.get("/health-check", (_, res) => res.sendStatus(200));

// Public routes
router.use("/auth", authLimiter, authRouter);

// Protected routes (all logged-in users)
router.use(protect);

// Admin & Read Only User routes
router.use("/admin/users", usersRouter);
router.use("/admin/transactions", transactionLimiter, transactionRouter);
router.use("/admin/analytics", analyticsLimiter, analyticsRouter);

//user routers
router.use("/user/transactions", authorize("USER"), transactionLimiter, userTransactionRouter);
router.use("/user/analytics", authorize("USER"), analyticsLimiter, userAnalyticsRouter);

export default router;
