const express = require("express");

const router = express.Router();

const{postTeacher} = require("../controllers/teacherController")

router.post("/postTeacher", postTeacher)

module.exports = router;