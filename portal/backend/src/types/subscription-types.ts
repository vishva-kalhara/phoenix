import mongoose from "mongoose";
import { IApplicationDoc } from "./application-types";

export interface ISubscription {
    clientId: string;
    appId: IApplicationDoc;
    createdAt: Date;
    amount: number;
    validityInDays: number;
}

export interface ISubscriptionDoc extends mongoose.Document, ISubscription {}
