import AppError from "../utils/AppError";

export interface errorDetails {
    name: string;
    message: string;
    properties?: {};
    kind: string;
    path: string;
}

export interface errorType extends AppError {
    errors: errorDetails[];
}

export type mongooseValidationError = {
    field: string;
    message: string;
};

export interface duplicateDocumentError extends AppError {
    errorResponse: {
        errmsg: String;
    };
}
