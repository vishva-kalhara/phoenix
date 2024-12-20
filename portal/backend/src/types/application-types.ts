import mongoose from "mongoose";
import { IUserDoc } from "./user-types";

export interface IApplicationDoc extends mongoose.Document {
    user: IUserDoc;
    name: string;
    appSecret: string;
    plans: {
        validityInDays: number;
        price: number;
    }[];
    isActive: boolean;
    createdAt: Date;
}
