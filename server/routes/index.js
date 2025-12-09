const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const errorHandler = require("../middleware/errorHandler");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.use(errorHandler)

