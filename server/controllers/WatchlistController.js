const { Watchlist, Movie } = require("../models");

module.exports = class Controller {
    static async getWatchlists(req, res, next) {
        try {
            const userId = req.user.id;
            const watchlists = await Watchlist.findAll({ where: { UserId: userId } });

            if (!watchlists) {
                throw { name: "Not Found", message: "No watchlists found for this user" };
            }

            res.status(200).json(watchlists);
        } catch (error) {
            console.log("🚀 ~ getWatchlists ~ error:", error);
            next(error);
        }
    }

    static async addWatchlist(req, res, next) {
        try {
            const userId = req.user.id;
            const movieId = req.params.id;
            const existingWatchlist = await Watchlist.findOne({ where: { UserId: userId, MovieId: movieId } });

            if (existingWatchlist) {
                throw { name: "Bad Request", message: "Movie already in watchlist" };
            }

            const movieData = await Movie.findByPk(movieId);

            if (!movieData) {
                throw { name: "Not Found", message: "Movie not found" };
            }

            const newWatchlist = await Watchlist.create({
                UserId: userId,
                MovieId: movieId,
                title: movieData.title,
                imageUrl: movieData.imageUrl,
                rating: movieData.rating,
                status: movieData.status,
                genres: [""],
                duration: 0
            });

            res.status(201).json({ message: "Movie added to watchlist", watchlist: newWatchlist });
        } catch (error) {
            console.log("🚀 ~ addWatchlist ~ error:", error);
            next(error);
        }

    }

    static async removeWatchlist(req, res, next) {
        try {
            const userId = req.user.id;
            const movieId = req.params.id;
            const watchlist = await Watchlist.findOne({ where: { UserId: userId, MovieId: movieId } });

            if (!watchlist) {
                throw { name: "Not Found", message: "Movie not found in watchlist" };
            }

            await Watchlist.destroy({ where: { UserId: userId, MovieId: movieId } });
            res.status(200).json({ message: "Movie removed from watchlist" });
        } catch (error) {
            console.log("🚀 ~ removeWatchlist ~ error:", error);
            next(error);
        }
    }
}