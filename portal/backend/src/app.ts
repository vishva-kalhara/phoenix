import express from "express";
import AppError from "./utils/AppError";
import errorMiddleware from "./middlewares/error-middleware";
import applicationRouter from "./routers/application-router";
import userRouter from "./routers/user-router";
import subscriptionRouter from "./routers/subscription-router";
import paymentRouter from "./routers/payment-router";
import morgan from "morgan";

export const createApp = () => {
    const app = express();

    app.use(express.json({ limit: "10kb" }));

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
        console.log();
    }

    app.get("/", async (req, res) => {
        res.status(200).json({ message: "API is up and running..." });
    });

    app.use("/api/v1/applications", applicationRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/subscriptions", subscriptionRouter);
    app.use("/api/v1/payments", paymentRouter);

    app.all("*", (req, _res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
    });

    app.use(errorMiddleware);

    return app;
};
