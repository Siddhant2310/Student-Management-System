const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
     name: { 
              type: String, 
              required: true, 
              minLength: 2
            }, 

     subject: { 
                 type: String, 
                 required: true,
                 unique: true 
    
    }, 
        experienceYrs: { 
                 type: Number, 
                 required: true,
                 min: 3
    } 
    
    }); 
    
     const Teacher = mongoose.model("Teacher", teacherSchema); 

     module.exports = Teacher;