import mongoose from "mongoose";

export interface ISubscriptionDoc extends mongoose.Document {
    clientId: string;
    appId: string;
    createdAt: Date;
    amount: number;
    validityInDays: number;
}
