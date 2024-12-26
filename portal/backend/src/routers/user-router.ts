import { Router } from "express";
import { getAccessToken, syncUserWithDB } from "../controllers/user-controller";

const router = Router();

router.get("/get-access-token", getAccessToken);
// .post("/sync-user-with-db", syncUserWithDB)

export default router;
