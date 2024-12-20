import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";
import subscriptionSchema from "../schemas/subscription-schema";

export const issueSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};

export const hasSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
