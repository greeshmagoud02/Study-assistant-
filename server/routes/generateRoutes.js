import { Router } from "express";
import { generate } from "../controllers/generateController.js";
import { generateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/generate", generateLimiter, generate);

export default router;
