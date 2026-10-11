import express from "express";
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    studentLogin,
    studentProfile,
} from "../controllers/studentController.js";

import protect from "../middleware/authMiddleware.js";
import { adminOnly } from '../middleware/adminMiddleware.js'

const router = express.Router();

router.get("/student", protect, getStudents);

router.get("/student/:id", protect, getStudentById);

router.get("/student-profile", studentProfile)

router.post("/student-add", protect, adminOnly, createStudent);

router.post("/student-login", studentLogin);

router.put("/student/:id", protect, adminOnly, updateStudent);

router.delete("/student/:id", protect, adminOnly, deleteStudent);

export default router;