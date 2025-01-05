import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { v4 as uuidv4 } from "uuid";
import applicationSchema from "../schemas/application-schema";
import subscriptionSchema from "../schemas/subscription-schema";
import mongoose from "mongoose";

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

export const regenerateAppSecret = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const app = await applicationSchema.findByIdAndUpdate(req.params.id, {
            appSecret: uuidv4(),
        });
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

export const getAppStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [monthlyEarningsData, uniqueUsers, chartData] = await Promise.all(
            [
                subscriptionSchema.aggregate([
                    {
                        $match: {
                            appId: new mongoose.Types.ObjectId(req.params.id),
                            createdAt: {
                                $gte: new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth(),
                                    1
                                ),
                                $lt: new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 1,
                                    1
                                ),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$amount",
                            count: { $sum: 1 },
                        },
                    },
                ]),
                subscriptionSchema.aggregate([
                    {
                        $match: {
                            appId: new mongoose.Types.ObjectId(req.params.id),
                        },
                    },
                    {
                        $group: {
                            _id: "$clientId",
                            count: {
                                $sum: 1,
                            },
                        },
                    },
                    {
                        $count: "total",
                    },
                ]),
                subscriptionSchema.aggregate([
                    {
                        $match: {
                            appId: new mongoose.Types.ObjectId(req.params.id),
                        },
                    },
                    {
                        $addFields: {
                            date: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt",
                                },
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$date", // Group by the extracted date
                            value: { $sum: 1 }, // Count the number of documents
                        },
                    },
                    {
                        $sort: { _id: 1 }, // Sort by date
                    },
                ]),
            ]
        );

        const monthlyEarnings = monthlyEarningsData.reduce(
            (acc: number, item: { _id: number; count: number }) =>
                acc + item._id * item.count,
            0
        );

        res.status(200).json({
            status: "Success",
            stats: {
                monthlyEarnings,
                uniqueUsers: uniqueUsers[0].total,
                chartData,
            },
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
