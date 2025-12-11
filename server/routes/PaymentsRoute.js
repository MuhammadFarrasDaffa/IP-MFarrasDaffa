const express = require("express");
const router = express.Router();
const midtransClient = require("midtrans-client");

const paymentController = require("../controllers/PaymentController");
const authentication = require("../middleware/authentication");

// Protected routes (require authentication)
router.use(authentication);
router.post("/create", paymentController.createTransaction);

// Webhook handler (no auth required - Midtrans will call this)
router.post("/webhook", (req, res, next) => {
    paymentController.handleNotification(req, res, next);
});

module.exports = router;