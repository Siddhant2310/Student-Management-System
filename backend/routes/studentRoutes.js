const express = require("express");

const router = express.Router();

const {
    getStudents,
    getStudentById,
    postStudent,
    updateStudent,
    deleteStudent,
    getMernOrJavaStudents,
    getStudentStartwithA,
    getStudentsByCourse,
    getAverageAgeByCourse,
    postManyStudents,
    sortStudentsByAge,
    createEmailIndex,
    getEmailIndex
} = require("../controllers/studentController");

const authenticate  = require("../middlewares/authMiddleware");
const authorize  = require("../middlewares/roleMiddleware");

router.get("/", getStudents);

router.get("/getMernOrJavaStudents", getMernOrJavaStudents);

router.get("/getStudentStartwithA", authenticate, authorize("admin"), getStudentStartwithA);

router.get("/getStudentByCourse", getStudentsByCourse);

router.get("/getAverageAgeByCourse", getAverageAgeByCourse);

router.post("/createEmailIndex", createEmailIndex);

router.get("/getEmailIndex", getEmailIndex);


router.post("/postManyStudents", postManyStudents);

router.get("/sortStudentsByAge", sortStudentsByAge);


// Keep /:id AFTER fixed routes
router.get("/:id", getStudentById);

router.post("/", postStudent);

router.patch("/:id", updateStudent);

router.delete("/:id", deleteStudent);


module.exports = router;