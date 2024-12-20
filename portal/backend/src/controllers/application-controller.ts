import { NextFunction, Request, Response } from "express";

export const createApp = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).send("Application created successfully");
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
