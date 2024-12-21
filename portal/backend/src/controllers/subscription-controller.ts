import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";
import subscriptionSchema from "../schemas/subscription-schema";
import applicationSchema from "../schemas/application-schema";

export const issueSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const subscription = await subscriptionSchema.create({
            clientId: req.body.clientId,
            appId: req.body.appId,
            amount: req.body.amount,
            validityInDays: req.body.validityInDays,
            expiresAt: new Date(
                new Date().getTime() +
                    req.body.validityInDays * 24 * 60 * 60 * 1000
            ),
        });

        res.status(201).json({ status: "success", data: subscription });
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
        if (
            !req.body.appSecret ||
            !req.body.stripeSecret ||
            !req.body.clientId
        ) {
            return next(
                new AppError(
                    "appSecret, clientId and stripeSecret key required",
                    400
                )
            );
        }

        const app = await applicationSchema.findOne({
            appSecret: req.body.appSecret,
            isActive: true,
        });
        if (!app) {
            return next(new AppError("Application not found", 404));
        }

        const subscription = await subscriptionSchema.findOne({
            appId: app._id,
            clientId: req.body.clientId,
            expiresAt: { $gte: new Date() },
        });
        if (!subscription) {
            return next(new AppError("Subscription not found", 403));
        }

        res.status(200).json({ status: "success" });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
