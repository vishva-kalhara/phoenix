import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";
import userSchema from "../schemas/user-schema";
import { createUser } from "../controllers/user-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: req.get("Authorization") || "",
            },
        });
        const data = await response.json();

        if (data.status == 401)
            return res.status(401).redirect("/auth/sign-in");

        const user = await userSchema.findOne({ externalId: data.id });
        if (!user) createUser(data.id, data.email);

        req.body.user = user;
        next();
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
