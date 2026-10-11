import teacherModel from "../models/teacher.js";

const teacherRead = async (req, res) => {
    try {
        const getData = await teacherModel.find();
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const teacherRegister = async (req, res) => {
    const { name, email, phone, subject, gender, salary, address } = req.body;

    try {
        if (!name || !email || !phone || !subject || !gender || !salary || !address) {
            return res.status(404).json({ success: false, message: "please all fileds requirement" });
        }

        const checkTeacher = await teacherModel.findOne({ name, email, phone });
        if (checkTeacher) return res.status(404).json({ success: false, message: "teacher already Exit" });

        const teacher = await teacherModel.create({ name, email, phone, subject, gender, salary, address });
        res.status(200).json({ success: true, message: "register teacher successFul" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const teacherUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await teacherModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!teacher) {
            return res.status(404).json({ success: false, message: "teacher not found" });
        }

        res.status(200).json({ success: true, message: "teacher Update successful" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const teacherDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await teacherModel.findByIdAndDelete(id)
        if (!teacher) {
            return res.status(404).json({ success: false, message: "teacher not found" });
        }

        res.status(200).json(teacher)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { teacherRegister, teacherRead, teacherUpdate, teacherDelete };