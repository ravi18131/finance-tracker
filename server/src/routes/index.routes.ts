import express from "express";
import authRouter from "@routes/auth/index.routes";
import { protect, authorize } from "@middlewares/auth.middleware";
import usersRouter from "./admin/user.routes";
import transactionRouter from "./admin/transaction.routes";
import analyticsRouter from "./admin/analytics.routes";

const router = express.Router();

// Health check
//@ts-ignore
router.get("/health-check", (_, res) => res.sendStatus(200));

// Public routes
router.use("/auth", authRouter);

// Protected routes (all logged-in users)
router.use(protect);

// Admin & Read Only User routes
router.use("/admin/users", usersRouter);
router.use("/admin/transactions", transactionRouter);
router.use("/admin/analytics", analyticsRouter);

export default router;
