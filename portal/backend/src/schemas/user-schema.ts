import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "../types/user-types";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema<IUserDoc>({
    email: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        default: uuidv4(),
    },
    isActive: {
        type: Boolean,
        default: true,
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
