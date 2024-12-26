import { NextFunction, Request, Response } from "express";
import userSchema from "../schemas/user-schema";
import AppError from "../utils/AppError";
import { v4 as uuidv4 } from "uuid";
import applicationSchema from "../schemas/application-schema";

export const createApp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // TODO: Get the user from the request
        const externalId = "req.body.externalId";

        if (!req.body.name) {
            return next(new AppError("Application name is required", 400));
        }

        if (!req.body.plans || req.body.plans.length === 0) {
            return next(new AppError("At least one plan is required", 400));
        }

        for (const plan of req.body.plans) {
            if (!plan.planName || !plan.validityInDays || !plan.price) {
                return next(
                    new AppError(
                        "Plan name, validity in days and price are required",
                        400
                    )
                );
            }
        }

        const loggedUser = await userSchema
            .findOne({ externalId: externalId })
            .select("_id");
        if (!loggedUser) {
            return next(new AppError("User not found", 404));
        }

        const app = await applicationSchema.create({
            user: loggedUser._id,
            name: req.body.name,
            appSecret: uuidv4(),
            plans: req.body.plans,
        });

        res.status(201).json({
            status: "success",
            data: {
                app,
            },
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};

export const getMyApps = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const apps = await applicationSchema.find({
            user: req.body.user._id,
            isActive: true,
        });

        res.status(200).json({
            status: "success",
            count: apps.length,
            apps,
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};

export const getApp = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Application fetched successfully");
};

export const updateApp = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Application updated successfully");
};

export const deleteApp = (req: Request, res: Response, next: NextFunction) => {
    res.status(204).send("Application delete successfully");
};
