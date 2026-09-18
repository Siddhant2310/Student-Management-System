const Course = require("../models/courseModel");

exports.postCourse = async (req, res) => {
    try {

        const { name, duration, teacher } = req.body;


        if (!name || !duration || !teacher) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const newCourse = await Course.create({
            name,
            duration,
            teacher
        });


        res.status(201).json({
            message: "Course added successfully",
            course: newCourse
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}