import { Router } from "express";
import {
    hasSubscription,
    issueSubscription,
} from "../controllers/subscription-controller";
import { useAuthHeader } from "../middlewares/use-auth-header";
import { useTokenHeader } from "../middlewares/use-token-header";

const router = Router();

router.route("/issue-subscription").get(useTokenHeader, issueSubscription);

router.post("/has-subscription", useAuthHeader, hasSubscription);

export default router;
