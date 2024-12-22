import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import tokenSchema from "../schemas/token-schema";

export const useTokenHeader = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const tempToken = req.query.token;
    if (!tempToken) {
        return next(new AppError("Unauthorized", 401));
    }

    const token = await tokenSchema.findOne({
        token: tempToken,
        expiresAt: { $gte: new Date() },
    });
    if (!token) {
        return next(new AppError("Unauthorized", 401));
    }

    await tokenSchema.deleteOne({ token: tempToken });

    next();
};
