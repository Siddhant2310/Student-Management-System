const Student = require("../models/studentModel");


// GET ALL STUDENTS
exports.getStudents = async (req, res) => {
    try {

        const students = await Student.find();

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// GET STUDENT BY ID
exports.getStudentById = async (req, res) => {
    try {

        const student = await Student.findById(req.params.id).populate("course", "name duration");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// ADD STUDENT
exports.postStudent = async (req, res) => {

    try {

        const { name, email, age, course, teacher } = req.body;


        if (!name || !email ||!age || !course|| !teacher) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const newStudent = await Student.create({
            name,
            email,
            age,
            course,
            teacher
        });


        res.status(201).json({
            message: "Student added successfully",
            student: newStudent
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};





// UPDATE STUDENT
exports.updateStudent = async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );


        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }


        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.postManyStudents = async (req, res) => {
    try {

        const students = req.body;

        const newStudents = await Student.insertMany(students);

        res.status(201).json({
            success: true,
            message: "Students added successfully",
            count: newStudents.length,
            students: newStudents
        });

    } catch (error) {

        console.log("Error in adding students:", error.message);

        res.status(500).json({
            success: false,
            message: "Server issue"
        });

    }
};



// DELETE STUDENT
exports.deleteStudent = async (req, res) => {

    try {

        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );


        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }


        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



exports.getMernOrJavaStudents = async (req, res) => {
    try {

        const student = await Student.find({
            course: { $in: ["MERN", "Java"] }
        });

        if (!student.length) {
            return res.status(404).json({
                success: false,
                message: "No student enrolled in MERN or Java course"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student(s) found successfully",
            count: student.length,
            students: student
        });

    } catch (error) {

        console.log("Error in finding students:", error.message);

        res.status(500).json({
            success: false,
            message: "Server issue"
        });
    }
};

exports.getStudentStartwithA = async (req, res) => {
    try {

        const students = await Student.find({
            name: { $regex: /^A/ }
        });

        if (!students.length) {
            return res.status(404).json({
                success: false,
                message: "No student found whose name starts with capital A"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student(s) found successfully",
            count: students.length,
            students: students
        });

    } catch (error) {

        console.log("Error in finding students:", error.message);

        res.status(500).json({
            success: false,
            message: "Server issue"
        });

    }
};

exports.getStudentsByCourse = async (req, res) => {
    try {

        const students = await Student.aggregate([
            
           
            {
                $group: {
                    _id: "$course",
                    totalStudents: { $sum: 1 }
                }
            },

           
            {
                $sort: {
                    totalStudents: -1
                }
            }

        ]);

        if (!students.length) {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Students grouped by course successfully",
            students: students
        });

    } catch (error) {

        console.log("Error in finding students:", error.message);

        res.status(500).json({
            success: false,
            message: "Server issue"
        });

    }
};
exports.getAverageAgeByCourse = async (req, res) => {
    try {

        const students = await Student.aggregate([
            {
                $group: {
                    _id: "$course",
                    averageAge: { $avg: "$age" }
                }
            },

            {
                $sort: {
                    averageAge: -1
                }
            }
        ]);

        if (!students.length) {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Average age calculated successfully",
            students: students
        });

    } catch (error) {

        console.log("Error in calculating average age:", error.message);

        res.status(500).json({
            success: false,
            message: "Server issue"
        });

    }
};

// exports.sortStudentsByAge = async (req, res) => {
//     try {
//         const students = await Student.aggregate([
//             {
//                 $sort: {
//                     age: 1
//                 }
//             }
//         ]);

//         res.status(200).json({
//             success: true,
//             students
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


//sort by dec
// exports.sortStudentsByAge = async (req, res) => {
//     try {
//         const { order } = req.query;

//         const sortOrder = order === "asc" ? 1 : -1;

//         const students = await Student.find().sort({
//             age: sortOrder
//         });

//         res.status(200).json({
//             success: true,
//             order: order,
//             students: students
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// sort by asc

exports.sortStudentsByAge = async (req, res) => {
    try {
        const { order = "asc" } = req.query;

        const sortOrder = order === "asc" ? 1 : -1;

        const students = await Student.find().sort({
            age: sortOrder
        });

        res.status(200).json({
            success: true,
            order: order,
            students: students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.createEmailIndex = async (req, res) => {
    try {

        const result = await Student.collection.createIndex(
            { email: 1 },
            { unique: true }
        );

        res.status(200).json({
            success: true,
            message: "Email index created successfully",
            indexName: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error creating email index",
            error: error.message
        });

    }
};

exports.getEmailIndex = async (req, res) => {
    try {

        const indexes = await Student.collection.indexes();

        res.status(200).json({
            success: true,
            indexes: indexes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error fetching indexes",
            error: error.message
        });

    }
};