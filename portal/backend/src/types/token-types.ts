import mongoose from "mongoose";

export interface IToken {
    token: string;
    expiresAt: Date;
    createdAt: Date;
    clientId: string;
}

export interface ITokenDoc extends IToken, mongoose.Document {}
