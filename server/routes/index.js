const express = require("express");
const router = express.Router();

const profileRoutes = require("./ProfilesRoute");
const watchlistRoutes = require("./WatchlistRoute");
const userController = require("../controllers/UserController");
const errorHandler = require("../middleware/errorHandler");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.use("/profiles", profileRoutes);

router.use("/watchlists", watchlistRoutes);

router.use(errorHandler)

module.exports = router;

