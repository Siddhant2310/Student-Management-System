const User = require("../models/userModel");

exports.postUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;


        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const newUser = await User.create({
            name,
            email,
            password,
            role
        });


        res.status(201).json({
            message: "user added successfully",
            user: newUser
        });

    } catch (error) {

        if(error.name === "ValidationError"){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.message
            })
        }

        console.error("Internal server error: ", error)

        res.status(500).json({
            message: error.message
        });

    }
}