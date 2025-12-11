module.exports = class Controller {
    static async getCollections(req, res, next) {
        try {

        } catch (error) {
            console.log("🚀 ~ getCollections ~ error:", error)
            next(error)
        }
    }
}