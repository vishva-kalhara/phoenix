import mongoose, { Schema } from "mongoose";
import { ISubscription, ISubscriptionDoc } from "../types/subscription-types";

const subscriptionSchema = new Schema<ISubscriptionDoc>({
    clientId: {
        type: String,
        required: true,
    },
    appId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    amount: {
        type: Number,
        required: true,
    },
    validityInDays: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.model<ISubscriptionDoc>(
    "Subscription",
    subscriptionSchema
);
