import { Router } from "express";
import {
    createApp,
    deleteApp,
    getApp,
    updateApp,
} from "../controllers/application-controller";

const router = Router();

router.route("/").post(createApp);

router.route("/:id").get(getApp).patch(updateApp).delete(deleteApp);

export default router;
