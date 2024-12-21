import { NextFunction, Response, Request } from "express";
import userSchema from "../schemas/user-schema";
import AppError from "../utils/AppError";

export const useAuthHeader = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.split(" ")[1]
    ) {
        return next(new AppError("Unauthorized", 401));
    }

    const user = await userSchema.findOne({
        apiKey: req.headers.authorization.split(" ")[1],
    });
    if (!user) {
        return next(new AppError("Unauthorized", 401));
    }

    req.body.user = user;
    next();
};
