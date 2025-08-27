import express from "express";
import authRouter from "@routes/auth/index.routes";
import { protect, authorize } from "@middlewares/auth.middleware";
import usersRouter from "./admin/user.routes";

const router = express.Router();

// Health check
//@ts-ignore
router.get("/health-check", (_, res) => res.sendStatus(200));

// Public routes
router.use("/auth", authRouter);

// Protected routes (all logged-in users)
router.use(protect);

// Admin-only routes
router.use("/admin/users", authorize("ADMIN"), usersRouter);

// Example: User-only routes
router.get("/profile", authorize("USER"), (req, res) => {
  res.json({ message: `Welcome USER ${req.session?.name}` });
});

// Example: Read-only user routes
router.get("/reports", authorize("READ_ONLY"), (req, res) => {
  res.json({ message: `Welcome READ_ONLY ${req.session?.name}` });
});

// Example: Allow both USER and READ_ONLY
router.get("/shared", authorize("USER", "READ_ONLY"), (req, res) => {
  res.json({ message: `Shared route for USER and READ_ONLY` });
});

export default router;
