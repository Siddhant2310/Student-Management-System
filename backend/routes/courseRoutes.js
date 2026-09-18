const express = require("express");

const router = express.Router();

const{postCourse} = require("../controllers/courseController")

router.post("/postCourse", postCourse)

module.exports = router;