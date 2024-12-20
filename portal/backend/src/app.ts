import express from "express";
import AppError from "./utils/AppError";
import errorMiddleware from "./middlewares/error-middleware";

export const createApp = () => {
    const app = express();

    app.use(express.json({ limit: "10kb" }));

    app.get("/", async (req, res) => {
        res.status(200).json({ message: "API is up and running..." });
    });

    app.all("*", (req, _res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
    });

    app.use(errorMiddleware);

    return app;
};
