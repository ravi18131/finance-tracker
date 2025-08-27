import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 5,
    message: { error: "Too many login attempts" }
});

export const transactionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
});

export const analyticsLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
});