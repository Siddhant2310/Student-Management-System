require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");


app.use(express.json());


// CORS
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();

});


// Routes
app.use("/api/students", studentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/',(req, res)=>{;
    res.send("Welcome to Api Practice project");

});

app.use((req, res)=>{
    res.status(404).json({
        message:"Route not found or missspelled"
    })
})

// async function hashPassword(password){
//     try{
//         const hashedPassword = await bcrypt.hash(password, 10);
//         return hashedPassword;
//     }catch(error){
//         console.error("Error in hashing the password: ", error);
//         throw error;
//     }
// }

// function main(){
//     const password = "123456";
//     hashPassword(password)
//         .then((hashedPassword) => {
//             console.log("Hashed Password: ", hashedPassword)
//         })
//         .catch((error) => {
//             console.error("Error:", error)
//         })
// }

// function comparePassword(plainPassword, hashedPassword){
//     bcrypt.compare(plainPassword, hashedPassword)
//         .then((isMatch) => {
//             if(isMatch) {
//                 console.log("Password matched");
//             }
//             else{
//                 console.log("Password not matched");
//             }
//         })
//         .catch((error) => {
//             console.error("Error in comparing the passwords:", error)
//         })
// }

// comparePassword("123456789", "$2b$10$oDJWK6tIhlV791mJsDz/XOuj4D4hQZwBhVoS.yPiAHwj1Y.cXOtkO")

// main()

// Connect MongoDB
connectDB()
    .then(() => {

        const PORT = 3001;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    });