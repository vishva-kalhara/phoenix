import mongoose from "mongoose";
import { IUserDoc } from "./user-types";

export interface IApplication {
    user: IUserDoc;
    name: string;
    appSecret: string;
    plans: {
        planName: string;
        validityInDays: number;
        price: number;
    }[];
    stripeSectretKey: string;
    isActive: boolean;
    createdAt: Date;
}

export interface IApplicationDoc extends mongoose.Document, IApplication {}
