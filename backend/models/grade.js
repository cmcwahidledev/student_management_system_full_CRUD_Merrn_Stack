import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.ObjectId, ref: "student", required: true, unique: true },
    course: { type: mongoose.Schema.ObjectId, ref: "course", required: true, unique: true },
    teacher: { type: mongoose.Schema.ObjectId, ref: "teacher", required: true, unique: true },
    assignment: { type: String, required: true },
    midterm: { type: String, required: true },
    total: { type: String, required: true },
    grade: { type: String, enum: ['A', 'B', 'C', 'F'], required: true },
    remark: { type: String, required: true, enum: ['pass'] },
}, {
    timestamps: true,
});

export default mongoose.model("grade", gradeSchema);