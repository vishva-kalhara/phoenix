import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "../types/user-types";

const userSchema = new Schema<IUserDoc>({
    email: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    externalId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model("User", userSchema);
