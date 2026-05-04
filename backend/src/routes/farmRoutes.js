import express from "express";
import { getCrops, addLocation, chooseCrop } from "../controllers/farmController.js";

const router = express.Router();

router.get("/crops", getCrops);
router.post("/location", addLocation);
router.post("/select-crop", chooseCrop);

export default router;