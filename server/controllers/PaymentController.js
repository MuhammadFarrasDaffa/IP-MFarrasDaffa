const midtransClient = require("midtrans-client");
const { Payment, Movie } = require("../models");

module.exports = class Controller {
    static async createTransaction(req, res, next) {
        try {
            const { movieId, title, price } = req.body;

            if (!movieId || !title || !price) {
                throw { name: "BadRequest", message: "movieId, title, and price are required" };
            }

            // Buat Snap client
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            const orderId = "ORDER-" + Date.now() + "-" + req.user.id;

            // Pastikan movie ada di database (hindari foreign key violation)
            const movieRecord = await Movie.findByPk(movieId);
            if (!movieRecord) {
                throw { name: "NotFound", message: "Movie not found" };
            }

            // Ambil harga dari movie jika tidak diberikan
            const amount = price || movieRecord.price || 0;

            const parameter = {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: amount,
                },
                item_details: [
                    {
                        id: movieId,
                        price: amount,
                        quantity: 1,
                        name: title,
                    },
                ],
                customer_details: {
                    email: req.user.email,
                    first_name: req.user.email.split("@")[0],
                },
            };

            const transaction = await snap.createTransaction(parameter);

            // Simpan payment record ke database
            await Payment.create({
                OrderId: orderId,
                UserId: req.user.id,
                MovieId: movieId,
                amount: amount,
                status: "pending",
                transactionDetails: JSON.stringify(transaction),
            });

            res.status(201).json({
                snapToken: transaction.token,
                redirectUrl: transaction.redirect_url,
                orderId: orderId,
            });
        } catch (err) {
            console.log("🚀 ~ createTransaction ~ err:", err);
            next(err);
        }
    }

    static async handleNotification(req, res, next) {
        try {
            const notification = req.body;
            const coreApi = new midtransClient.CoreApi({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            const transactionStatus = await coreApi.transaction.notification(notification);
            const orderId = transactionStatus.order_id;
            const paymentStatus = transactionStatus.transaction_status;

            // Update payment status di database
            await Payment.update(
                { status: paymentStatus },
                { where: { "OrderId": orderId } }
            );

            if (paymentStatus === "settlement") {
                console.log(`✅ Payment success for order ${orderId}`);
            } else if (paymentStatus === "deny") {
                console.log(`❌ Payment denied for order ${orderId}`);
            } else if (paymentStatus === "expire") {
                console.log(`⏱ Payment expired for order ${orderId}`);
            }

            res.status(200).json({ status: "OK" });
        } catch (err) {
            console.log("🚀 ~ handleNotification ~ err:", err);
            res.status(500).json({ message: "Error processing webhook" });
        }
    }
}