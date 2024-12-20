import mongoose, { Schema } from "mongoose";
import { IApplication } from "../types/application-types";

const applicationSchema = new Schema<IApplication>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    appSecret: {
        type: String,
        required: true,
    },
    plans: [
        {
            planName: {
                type: String,
                required: true,
            },
            validityInDays: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    stripeSectretKey: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model<IApplication>("Application", applicationSchema);
