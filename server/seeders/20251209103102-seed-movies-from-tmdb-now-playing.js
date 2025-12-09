'use strict';
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const url_movies = `${process.env.TMDB_BASE_URL}/movie/now_playing`;
    const options_movies = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_KEY}`
      }
    };

    const response_movies = await fetch(url_movies, options_movies);
    let data = await response_movies.json()

    data = data.results.map((movie, i) => {
      return {
        tmdbId: movie.id,
        title: movie.original_title,
        description: movie.overview,
        rating: movie.vote_average,
        imageUrl: `${process.env.TMDB_IMAGE_URL}${movie.poster_path}`,
        status: "playing",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Movies', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
