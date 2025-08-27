import { getAllTransactionsAnalytics } from "@controllers/user/analytics.controller";
import express from "express";

const userAnalyticsRouter = express.Router();

userAnalyticsRouter.get("/", getAllTransactionsAnalytics);

export default userAnalyticsRouter;