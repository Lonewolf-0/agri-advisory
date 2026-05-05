import express from 'express';
import { getAdvisory } from '../controllers/advisoryController.js';

const router = express.Router();

router.get("/", getAdvisory);

export default router;