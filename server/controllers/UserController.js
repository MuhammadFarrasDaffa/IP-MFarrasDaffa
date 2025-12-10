const { User, Profile } = require("../models");
const { signToken } = require("../helpers/jwt");
const { compareHash } = require("../helpers/bcrypt");

module.exports = class Controller {
    static async login(req, res, next) {
        try {

            if (!req.body) {
                throw { name: "Bad Request", message: "Email is required" }
            }

            const { email, password } = req.body;

            if (!email) {
                throw { name: "Bad Request", message: "Email is required" }
            }
            if (!password) {
                throw { name: "Bad Request", message: "Password is required" }
            }

            const user = await User.findOne({ where: { email } });

            console.log(user);


            // cari email ke db
            if (!user) {
                throw { name: "Unauthorized", message: "Invalid email or password" };
            }

            // check password
            const isValidPassword = compareHash(password, user.password);
            if (!isValidPassword) {
                throw { name: "Unauthorized", message: "Invalid email or password" };
            }

            // bikin token
            const access_token = signToken({ id: user.id });

            res.status(200).json({ access_token, message: "Login Successfull" });
        } catch (error) {
            console.log("🚀 ~ login ~ error:", error);
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            const newUser = await User.create(req.body);

            await Profile.create({
                UserId: newUser.id
            })

            res.status(201).json({ message: "Register Successfull" });
        } catch (error) {
            console.log("🚀 ~ addUser ~ error:", error)
            next(error);
        }
    }
};
