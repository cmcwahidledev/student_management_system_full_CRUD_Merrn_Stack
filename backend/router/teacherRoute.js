import express from "express"
import { teacherRegister, teacherRead, teacherUpdate, teacherDelete } from "../controllers/teacherController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/teacher-add", protect, adminOnly, teacherRegister);

router.get("/teacher", protect, adminOnly, teacherRead);

router.put("/teacher/:id", protect, adminOnly, teacherUpdate);

router.delete("/teacher/:id", protect, adminOnly, teacherDelete);


export default router;