import mongoose, { Schema } from "mongoose";
import { IToken } from "../types/token-types";
import { v4 as uuidv4 } from "uuid";

const tokenSchema = new Schema<IToken>({
    token: {
        type: String,
        default: uuidv4(),
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 60 * 1000 * 24),
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    clientId: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IToken>("Tokens", tokenSchema);
