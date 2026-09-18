const Teacher = require("../models/teacherModel");

exports.postTeacher = async (req, res) => {
    try {

        const { name, subject, experienceYrs } = req.body;


        if (!name || !subject || !experienceYrs) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const newTeacher = await Teacher.create({
            name,
            subject,
            experienceYrs
        });


        res.status(201).json({
            message: "Teacher added successfully",
            teacher: newTeacher
        });

    } catch (error) {

        if(error.name === "ValidationError"){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.message
            })
        }

        res.status(500).json({
            message: error.message
        });

    }
}