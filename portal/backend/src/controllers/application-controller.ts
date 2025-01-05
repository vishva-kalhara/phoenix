import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { v4 as uuidv4 } from "uuid";
import applicationSchema from "../schemas/application-schema";

export const createApp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
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

        const app = await applicationSchema.create({
            user: req.body.user._id,
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

export const getApp = async (
    req: Request,
    res: Response,

    next: NextFunction
) => {
    try {
        const app = await applicationSchema.findOne({ _id: req.params.id });
        if (!app) return next(new AppError("App not found!", 404));

        res.status(200).json({
            status: "success",
            app,
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};

export const updateApp = (req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ message: "Endpoint is under construction." });
};

export const deleteApp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const app = await applicationSchema.findByIdAndDelete(req.params.id);
        if (!app) return next(new AppError("App not found!", 404));

        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
