const { Profile } = require("../models");

module.exports = class Controller {
    static async getProfiles(req, res, next) {
        try {
            const id = req.user.id;
            const profile = await Profile.findOne({ where: { UserId: id } });
            if (!profile) {
                throw { name: "Not Found", message: "Profile not found" };
            }
            res.status(200).json(profile);
        } catch (error) {
            console.log("🚀 ~ getProfiles ~ error:", error);
            next(error);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { id } = req.params;
            const { username, age, preferences, imageUrl } = req.body;
            const profile = await Profile.findOne({ where: { UserId: id } });
            if (!profile) {
                throw { name: "Not Found", message: "Profile not found" };
            }
            await Profile.update(
                { username, age, preferences, imageUrl },
                { where: { UserId: id } }
            );
            res.status(200).json({ message: "Profile updated successfully" });
        } catch (error) {
            console.log("🚀 ~ updateProfile ~ error:", error)
            next(error)
        };
    }
}