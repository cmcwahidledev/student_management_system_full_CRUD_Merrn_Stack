import gradeModel from "../models/grade.js";

const GetGrade = async (req, res) => {
    try {
        const grade = await gradeModel.find()
            .populate("student")
            .populate("course")
            .populate("teacher")

        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const GradeAdd = async (req, res) => {
    const { student, course, teacher, assignment, midterm, total, grade, remark } = req.body;

    try {
        if (!student || !course || !teacher || !assignment || !midterm || !total || !grade || !remark) {
            return res.status(404).json({ message: "all fields is required" });
        }

        const checkStudent = await gradeModel.findOne({ student });
        const checkCourse = await gradeModel.findOne({ course });
        const checkTeacher = await gradeModel.findOne({ teacher });

        if (checkStudent || checkCourse || checkTeacher) {
            return res.status(404).json({ success: false, message: "grade already Exits" });
        }

        await gradeModel.create({ student, course, teacher, assignment, midterm, total, grade, remark });

        res.status(200).json({ success: true, message: "grade saved successFull" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateGrade = async (req, res) => {
    const { id } = req.params;
    try {
        const grade = await gradeModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, });

        if (!grade) {
            return res.status(404).json({
                success: false,
                message: "Grade not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Grade updated successfully",
            data: grade,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
};

const deleteGrade = async (req, res) => {
    const { id } = req.params;

    try {
        const grade = await gradeModel.findByIdAndDelete(id);

        if (!grade) {
            return res.status(404).json({
                success: false,
                message: "Grades not found",
            });
        }

        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
};

export { GetGrade, GradeAdd, updateGrade, deleteGrade }