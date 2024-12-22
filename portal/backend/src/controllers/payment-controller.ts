import { NextFunction, Response, Request } from "express";
import Stripe from "stripe";
import AppError from "../utils/AppError";
import applicationSchema from "../schemas/application-schema";
import tokenSchema from "../schemas/token-schema";

export const createCheckoutLink = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            !req.body.stripeSecret ||
            !req.body.appSecret ||
            !req.body.clientId
        ) {
            return next(
                new AppError(
                    "Stripe secret key, client Id and App Secret required",
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

        const token = await tokenSchema.create({ clientId: req.body.clientId });

        const stripe = new Stripe(req.body.stripeSecret);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${app.name}-${app.plans[0].planName}(${app.plans[0].validityInDays} days)`,
                        },
                        unit_amount: app.plans[0].price * 100, // Price in cents ($20.00)1
                    },
                    quantity: 1,
                },
            ],
            mode: "payment", // Use 'payment' for one-time payments
            success_url: `${process.env.BACKEND_URL}/subscriptions/issue-subscription?clientId=${req.body.clientId}&&appId=${app.id}&&amount=${app.plans[0].price}&&validityInDays=${app.plans[0].validityInDays}&&token=${token.token}`,
            cancel_url: `${process.env.BACKEND_URL}/tokens/delete-token/${token.token}`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
