import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";

export const createCheckoutLink = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Create Checkout session
        // Get public key from req body
        // Get price id from req body

        res.redirect(200, "https://www.youtube.com/");
    } catch (error) {
        console.error(error);
        next(new AppError("Unknown Error Occured!", 500));
    }
};
