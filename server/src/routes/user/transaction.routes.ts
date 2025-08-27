import { createTransaction, deleteTransaction, getTransactionByUserId, updateTransaction } from "@controllers/user/transaction.controller";
import express from "express";

const userTransactionRouter = express.Router();

userTransactionRouter.patch("/:id", updateTransaction);
userTransactionRouter.delete("/:id", deleteTransaction);
userTransactionRouter.post("/", createTransaction);
userTransactionRouter.get("/", getTransactionByUserId);

export default userTransactionRouter;