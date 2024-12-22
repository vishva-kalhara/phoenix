import { Router } from "express";
import { deleteToken } from "../controllers/tokens-controller";

const router = Router();

router.get("/delete-token/:token", deleteToken);

export default router;
