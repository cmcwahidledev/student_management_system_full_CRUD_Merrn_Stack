import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    teacher: { type: mongoose.Schema.ObjectId, ref: "teacher", required: true, unique: true },
    duration: { type: String, required: true },
    fee: { type: String, required: true },

}, {
    timestamps: true
})

export default mongoose.model("course", courseSchema)