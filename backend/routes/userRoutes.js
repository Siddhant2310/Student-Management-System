const express = require("express");

const router = express.Router();

const{postUser} = require("../controllers/userController")

router.post("/postUser", postUser)

module.exports = router;