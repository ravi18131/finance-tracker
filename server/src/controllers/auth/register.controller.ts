import bcrypt from "bcryptjs";
import { db } from "@config/db";
import { Response, Request } from "express";
import _response from "@utils/response.util";
import asyncHandler from "@middlewares/async.middleware";
import { signAccessToken, signRefreshToken } from "@services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  if (!email || !password) {
    return _response(res, 404, false, {}, "Email and password are required");
  }

  const user = await db.user.findFirst({
    where: { email },
  });

  if (user) {
    return _response(res, 200, false, {}, "User already exists");
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const new_user = await db.user.create({
    data: {
      email,
      name,
      role: role ? role : "USER",
      password: hashed_password,
    },
  });

  const user_data = await db.user.findFirst({
    omit: {
      password: true,
    },
    where: { id: new_user.id },
  });

  // sign a access token
  const access_token = await signAccessToken(user_data);

  // sign a refresh token
  const refresh_token = await signRefreshToken({
    userId: new_user.id.toString(),
  });

  return _response(
    res,
    200,
    true,
    { access_token, refresh_token },
    "User registered successfully"
  );
});
