import courseModel from "../models/course.js";


export const getCourse = async (req, res) => {
    try {
        const course = await courseModel.find().populate("teacher");

        res.status(200).json(course);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { name, code, teacher, duration, fee } = req.body;

        if (!name || !code || !teacher || !duration || !fee) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const courseExistsName = await courseModel.findOne({ name });
        const courseExistsCode = await courseModel.findOne({ code });
        const courseExistsTeacher = await courseModel.findOne({ teacher });

        if (courseExistsName || courseExistsCode || courseExistsTeacher) {
            return res.status(400).json({
                success: false,
                message: "course already exists",
            });
        }

        const studentSave = courseModel.create({
            name,
            code,
            teacher,
            duration,
            fee
        });

        res.status(201).json({
            success: true,
            message: "course created successfully",
            studentSave
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "course updated successfully",
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModel.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};