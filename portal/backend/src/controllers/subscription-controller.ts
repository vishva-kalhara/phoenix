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
        await subscriptionSchema.create({
            clientId: req.query.clientId,
            appId: req.query.appId,
            amount: req.query.amount,
            validityInDays: req.query.validityInDays,
            expiresAt: new Date(
                new Date().getTime() +
                    Number(req.query.validityInDays) * 24 * 60 * 60 * 1000
            ),
        });

        res.redirect(200, `${process.env.FRONTEND_URL}/subscription-success`);
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
