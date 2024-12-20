import { Response } from "express";
import {
    duplicateDocumentError,
    errorType,
    mongooseValidationError,
} from "../types/error-types";
import AppError from "../utils/AppError";

export const handleDuplicateDocuments = (err: duplicateDocumentError) => {
    const matchResult = err.errorResponse.errmsg.match(
        /(["'])(?:(?=(\\?))\2.)*?\1/
    );
    if (matchResult) {
        const value = matchResult[0];
        return new AppError(`There is a record associated to ${value}`, 400);
    } else return new AppError(`Unhandled Error Occured`, 500);
};

export const handleValidationErrors = (err: errorType) => {
    const errors: mongooseValidationError[] = Object.values(err.errors).map(
        (el) => {
            return { field: el.path, message: el.message };
        }
    );
    return new AppError(errors, 400);
};

export const handleInvalidObjectIDs = () => {
    return new AppError("No document found with that ID", 404);
};

export const handleJWTMalformed = () => {
    return new AppError("Please sign in to the application!", 401);
};

export const sendErrorDev = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: { ...err, name: err.name },
        message: err.message,
        stack: err.stack,
    });
};

export const sendErrorProd = (err: AppError, res: Response) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            data: err.errorBody || undefined,
        });
    } else {
        console.error("Error 💥💥", err);
        res.status(500).json({
            status: "error",
            message:
                err.message || "Something went wrong. Please try again later.",
        });
    }
};
