import { Router } from "express";
import {
    hasSubscription,
    issueSubscription,
} from "../controllers/subscription-controller";
import { useAuthHeader } from "../middlewares/use-auth-header";

const router = Router();

router.route("/").post(useAuthHeader, issueSubscription);

router.post("/has-subscription", hasSubscription);

export default router;
