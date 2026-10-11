import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, },
        email: { type: String, required: true, unique: true, },
        phone: { type: String, required: true, },
        age: { type: Number, required: true, },
        gender: { type: String, enum: ["male", "female"], required: true, },
        address: { type: String, required: true, },
        course: { type: mongoose.Schema.ObjectId, ref: "course", unique: true },
        teacher: { type: mongoose.Schema.ObjectId, ref: "teacher", unique: true },
        grade: { type: mongoose.Schema.ObjectId, ref: "grade", unique: true },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("student", studentSchema);

export default Student;