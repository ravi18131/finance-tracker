import express from "express";
import validate from "@middlewares/validate.middleware";
import { login } from "@controllers/auth/login.controller";
import { createUserSchema, userLoginSchema } from "@schema/user.schema";
import { register } from "@controllers/auth/register.controller";

const authRouter = express.Router();

authRouter.post("/login", validate(userLoginSchema), login);
authRouter.post("/sign-up", validate(createUserSchema), register);

export default authRouter;
