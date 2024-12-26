import { NextFunction, Request, Response } from "express";
import uuid from "uuid";
import AppError from "../utils/AppError";
import userSchema from "../schemas/user-schema";

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
        await userSchema.create({
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

        res.status(200).json(data);
    } catch (error) {
        // console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
