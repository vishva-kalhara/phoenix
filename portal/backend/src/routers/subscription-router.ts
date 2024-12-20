import { Router } from "express";
import {
    hasSubscription,
    issueSubscription,
} from "../controllers/subscription-controller";

const router = Router();

router.route("/").post(issueSubscription);

router.get("/has-subscription", hasSubscription);

export default router;
