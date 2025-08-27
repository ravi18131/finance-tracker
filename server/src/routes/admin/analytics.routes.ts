import { getAllTransactionsAnalytics, getUserWithAnalyticsByUserId, getUserWithAnalyticsCategoryByUserId } from "@controllers/admin/analytics.controller";
import { authorize } from "@middlewares/auth.middleware";
import express from "express";

const analyticsRouter = express.Router();

analyticsRouter.get("/", authorize("ADMIN", "READ_ONLY"), getAllTransactionsAnalytics);
analyticsRouter.get("/user/:userId", authorize("ADMIN", "READ_ONLY"), getUserWithAnalyticsByUserId);
analyticsRouter.get("/category/user/:userId", authorize("ADMIN", "READ_ONLY"), getUserWithAnalyticsCategoryByUserId);

export default analyticsRouter;