import express from "express";
import {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../controllers/courseController.js";

import protect from "../middleware/authMiddleware.js";
import { adminOnly } from '../middleware/adminMiddleware.js'

const router = express.Router();

router.get("/course", protect, getCourse);

router.post("/course-add", protect, adminOnly, createCourse);

router.put("/course/:id", protect, adminOnly, updateCourse);

router.delete("/course/:id", protect, adminOnly, deleteCourse);

export default router;