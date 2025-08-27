import { createTransaction, deleteTransaction, getAlltransaction, getTransactionByUserId, updateTransaction } from "@controllers/admin/transaction.controller";
import express from "express";

const transactionRouter = express.Router();

transactionRouter.get("/", getAlltransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);
transactionRouter.post("/user/:userId", createTransaction);
transactionRouter.get("/user/:userId", getTransactionByUserId);

export default transactionRouter;