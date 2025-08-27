import { NextFunction, Request, Response } from "express";
import asyncHandler from "@middlewares/async.middleware";
import ErrorResponse from "@utils/error.util";
import { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "@services/jwt.service";
import { db } from "@config/db";

/**
 * protect middleware to authenticate user
 */
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse("Not authorized, no token", 401));
    }

    try {
      // verify token
      const decoded = <JwtPayload>verifyJwt(token, "accessTokenPublicKey");

      if (!decoded) {
        return next(new ErrorResponse("Not authorized, invalid token", 401));
      }

      const user = await db.user.findUnique({
        where: { id: decoded["id"] },
      });

      if (!user) {
        return next(new ErrorResponse("User not found", 404));
      }

      if (user.isBlocked) {
        return next(new ErrorResponse("User account is blocked", 403));
      }

      /**
       * !important
       * session type is extended from Request in util.d.ts and included in tsconfig
       */
      req.session = user;

      next();
    } catch (err) {
      console.error("Auth error", err);
      return next(new ErrorResponse("Not authorized", 401));
    }
  }
);

/**
 * Role-based Access Control (RBAC) middleware
 * @param roles allowed roles
 */
export const authorize = (...roles: ("ADMIN" | "USER" | "READ_ONLY")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session) {
      return next(new ErrorResponse("Not authorized", 401));
    }

    const userRole = req.session.role;

    if (!roles.includes(userRole)) {
      return next(new ErrorResponse(`${userRole} is not authorized`, 403));
    }

    next();
  };
};
