import { NextFunction, Request, Response } from "express";
import User from "../schemas/user-schema";
import uuid from "uuid";

export const syncUserWithDB = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.create({
            email: "req.body.email",
            apiKey: "uuid.v4()",
            isActive: true,
            externalId: "req.body.externalId",
        });

        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};
