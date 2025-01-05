import { Router } from "express";
import {
    createApp,
    deleteApp,
    getApp,
    getMyApps,
    regenerateAppSecret,
} from "../controllers/application-controller";
import protect from "../middlewares/protect";

const router = Router();

router.use(protect);

router.route("/").post(createApp);

router.get("/my-apps", getMyApps);

router.route("/:id").get(getApp).delete(deleteApp);
router.patch("/:id/new-app-secret", regenerateAppSecret);

export default router;
