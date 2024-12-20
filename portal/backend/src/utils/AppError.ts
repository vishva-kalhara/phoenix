import { mongooseValidationError } from "../types/error-types";

class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    errorBody?: mongooseValidationError[];
    code?: number;
    kind?: string;

    constructor(
        message: string | mongooseValidationError[],
        statusCode: number
    ) {
        if (typeof message === "string") super(message);
        else {
            super("mongoose validation error");
            this.errorBody = message;
        }
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
