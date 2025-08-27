import { createTransaction, deleteTransaction, getAlltransaction, getTransactionByUserId, updateTransaction } from "@controllers/admin/transaction.controller";
import { authorize } from "@middlewares/auth.middleware";
import express from "express";

const transactionRouter = express.Router();

transactionRouter.get("/", authorize("ADMIN", "READ_ONLY"), getAlltransaction);
transactionRouter.patch("/:id", authorize("ADMIN"), updateTransaction);
transactionRouter.delete("/:id", authorize("ADMIN"), deleteTransaction);
transactionRouter.post("/user/:userId", authorize("ADMIN"), createTransaction);
transactionRouter.get("/user/:userId", authorize("ADMIN", "READ_ONLY"), getTransactionByUserId);

export default transactionRouter;