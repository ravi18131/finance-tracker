import { getAllUser, updateStatus } from "@controllers/admin/user.controller";
import { authorize } from "@middlewares/auth.middleware";
import express from "express";

const usersRouter = express.Router();

usersRouter.get("/", authorize("ADMIN", "READ_ONLY"), getAllUser);
usersRouter.patch("/:id", authorize("ADMIN"), updateStatus);

export default usersRouter;