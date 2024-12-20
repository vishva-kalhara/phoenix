import mongoose from "mongoose";

export interface IUserDoc extends mongoose.Document {
    email: string;
    apiKey: string;
    isActive: boolean;
    externalId: string;
    createdAt: Date;
}
