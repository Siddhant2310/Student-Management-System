
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     age: {
//         type: Number,
//         required: true
//     },

//     course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//         required: true
//     },
//     teacher: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Teacher",
//         required: true
//     }
// });

// studentSchema.pre("save", function(next) {
//     console.log("leechad students database mein save hone jaa rahe hai");
//     next();
// })

// const Student = mongoose.model("Student", studentSchema);

// module.exports = Student;


const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
}); 

studentSchema.pre("save", async function() {
    console.log("leechad students database mein save hone jaa rahe hai");
});

//strongly suggests you're using Mongoose 9.9.3. In newer Mongoose versions, middleware should use the promise/async style instead of the old next callback pattern.

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;