import express from "express";
import validate from "@middlewares/validate.middleware";
import { login } from "@controllers/auth/login.controller";
import { userLoginSchema } from "@schema/user.schema";

const authRouter = express.Router();

authRouter.post("/login", validate(userLoginSchema), login);

export default authRouter;
