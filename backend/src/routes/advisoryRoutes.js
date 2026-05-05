import express from "express";
import { getAdvisory } from "../controllers/advisoryController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getAdvisory);

export default router;
