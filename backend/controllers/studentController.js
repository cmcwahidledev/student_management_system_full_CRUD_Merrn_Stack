import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate("course")
            .populate("teacher")
            .populate("grade");

        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createStudent = async (req, res) => {
    try {
        const { name, email, phone, age, gender, address, course, teacher, grade } = req.body;

        if (!name || !email || !phone || !age || !gender || !address) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const studentExists = await Student.findOne({ email });

        if (studentExists) {
            return res.status(400).json({
                success: false,
                message: "Student already exists",
            });
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "waad ka yartahay 18",
            });
        }

        const studentSave = Student({
            name,
            email,
            phone,
            age,
            gender,
            address,
            course,
            teacher,
            grade
        });

        await studentSave.save();

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const studentLogin = async (req, res) => {
    const { email } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    const tokenStudent = jwt.sign({ id: student._id }, "secretStudent123", {
        expiresIn: "1h",
    });

    res.setHeader("Authorization", `Bearer ${tokenStudent}`);

    res.status(200).json({
        success: true,
        message: "successfully logged in",
        tokenStudent,
        data: student
    });
};



export const studentProfile = async (req, res) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "secretStudent123");

        const student = await Student.findById(decoded.id)
            .populate("course")
            .populate("teacher")
            .populate("grade");
        console.log(student)
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
