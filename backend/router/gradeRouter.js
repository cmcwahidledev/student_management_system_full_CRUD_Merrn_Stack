import express from "express";
import {
    GetGrade,
    GradeAdd,
    deleteGrade,
    updateGrade
} from "../controllers/gradeController.js";

import protect from "../middleware/authMiddleware.js";
import { adminOnly } from '../middleware/adminMiddleware.js'

const router = express.Router();

router.get("/grade", protect, GetGrade);

router.post("/grade-add", protect, adminOnly, GradeAdd);

router.put("/grade/:id", protect, adminOnly, updateGrade);

router.delete("/grade/:id", protect, adminOnly, deleteGrade);



export default router;