import { Router } from "express";
import { syncUserWithDB } from "../controllers/user-controller";

const router = Router();

router.post("/sync-user-with-db", syncUserWithDB);

export default router;
