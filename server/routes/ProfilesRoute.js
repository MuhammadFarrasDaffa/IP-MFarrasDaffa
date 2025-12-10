const express = require("express");
const router = express.Router();

const profileController = require("../controllers/ProfileController");
const authentication = require("../middleware/authentication");

router.use(authentication)

router.get("/:id", profileController.getProfiles);
router.put("/:id", profileController.updateProfile);

module.exports = router;