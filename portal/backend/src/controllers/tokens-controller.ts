import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import tokenSchema from "../schemas/token-schema";

export const deleteToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.params.token) {
            return next(new AppError("Token is required", 400));
        }

        await tokenSchema.deleteOne({ token: req.params.token });

        res.redirect(`${process.env.FRONTEND_URL}/subscription-failed`);
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
