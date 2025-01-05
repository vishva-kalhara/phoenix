import { Router } from "express";
import {
    getAccessToken,
    getMe,
    regenerateAPIKey,
} from "../controllers/user-controller";
import protect from "../middlewares/protect";

const router = Router();

router
    .get("/get-access-token", getAccessToken)
    .get("/me", protect, getMe)
    .patch("/new-api-key", protect, regenerateAPIKey);

export default router;
