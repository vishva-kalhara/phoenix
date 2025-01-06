import { NextFunction, Request, Response } from "express";
import uuid from "uuid";
import AppError from "../utils/AppError";
import userSchema from "../schemas/user-schema";
import { v4 as uuidv4 } from "uuid";

export const syncUserWithDB = async (externalId: string) => {
    try {
        console.log("create user");
        // const user = await User.create({
        //     email: "req.body.email",
        //     apiKey: "uuid.v4()",
        //     isActive: true,
        //     externalId: "req.body.externalId",
        // });

        // res.status(201).json({
        //     status: "success",
        //     data: {
        //         user,
        //     },
        // });
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (externalId: string, email: string) => {
    try {
        return await userSchema.create({
            email,
            externalId,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const queryString = `?client_id=${process.env.AUTH_GITHUB_CLIENT_ID}&client_secret=${process.env.AUTH_GITHUB_CLIENT_SECRET}&code=${req.query.code}`;

        const response = await fetch(
            "https://github.com/login/oauth/access_token" + queryString,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        const data = await response.json();

        // const user = await userSchema.findOne({ externalId: data.id });
        // if (!user) createUser(data.id, data.email);

        res.status(200).json(data);
    } catch (error) {
        // console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};

export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).json({
            status: "Success",
            user: req.body.user,
        });
    } catch (error) {
        // console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};

export const regenerateAPIKey = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userSchema.findByIdAndUpdate(req.body.user._id, {
            apiKey: uuidv4(),
        });

        res.status(200).json({
            status: "Success",
            user: user,
        });
    } catch (error) {
        // console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
