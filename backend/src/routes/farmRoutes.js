import express from "express";
import {
  getCrops,
  addLocation,
  chooseCrop,
  getLocations,
} from "../controllers/farmController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/crops", authenticate, getCrops);
router.post("/location", authenticate, addLocation);
router.post("/select-crop", authenticate, chooseCrop);
router.get("/locations", authenticate, getLocations);

export default router;
