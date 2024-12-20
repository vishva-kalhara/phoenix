import { NextFunction, Request, Response } from "express";
import {
    handleDuplicateDocuments,
    handleInvalidObjectIDs,
    handleJWTMalformed,
    handleValidationErrors,
    sendErrorDev,
    sendErrorProd,
} from "../controllers/error-controller";
import AppError from "../utils/AppError";
import { duplicateDocumentError, errorType } from "../types/error-types";

export default (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let error = err;
    error.statusCode = err.statusCode || 500;
    error.status = err.status || "error";

    if (
        (process.env.NODE_ENV as string) === "production" ||
        (process.env.NODE_ENV as string) === "test"
    ) {
        if (error.name == "ValidationError")
            error = handleValidationErrors(error as errorType);
        if (error.code === 11000)
            error = handleDuplicateDocuments(error as duplicateDocumentError);
        if (
            error.statusCode === 500 &&
            error.name === "CastError" &&
            error.kind === "ObjectId"
        )
            error = handleInvalidObjectIDs();

        if (
            error?.name === "JsonWebTokenError" ||
            error?.name == "TokenExpiredError"
        ) {
            error = handleJWTMalformed();
        }
        return sendErrorProd(error, res);
    }
    return sendErrorDev(error, res);
};
