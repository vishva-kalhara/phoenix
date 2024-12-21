import { Router } from "express";
import { useAuthHeader } from "../middlewares/use-auth-header";
import { createCheckoutLink } from "../controllers/payment-controller";

const router = Router();

router.route("/create-checkout-link").post(createCheckoutLink);

export default router;
