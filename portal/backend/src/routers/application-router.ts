import { Router } from "express";
import {
    createApp,
    deleteApp,
    getApp,
    getMyApps,
    updateApp,
} from "../controllers/application-controller";
import protect from "../middlewares/protect";

const router = Router();

router.use(protect);

router.route("/").post(createApp);

router.get("/my-apps", getMyApps);

router.route("/:id").get(getApp).patch(updateApp).delete(deleteApp);

export default router;
