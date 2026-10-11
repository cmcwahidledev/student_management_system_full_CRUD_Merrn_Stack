import mongoose from "mongoose";

const teacherschema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    salary: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true
})

export default mongoose.model("teacher", teacherschema)