import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";
import subscriptionSchema from "../schemas/subscription-schema";

export const issueSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("issued subscription");
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
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
