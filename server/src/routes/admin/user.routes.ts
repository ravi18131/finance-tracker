import { getAllUser, updateStatus } from "@controllers/admin/user.controller";
import express from "express";

const usersRouter = express.Router();

usersRouter.get("/", getAllUser);
usersRouter.patch("/:id", updateStatus);

export default usersRouter;