require("dotenv").config();

const url_movies = `${process.env.TMDB_BASE_URL}/movie/upcoming`;
const options_movies = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_KEY}`
    }
};

async function fetch() {
    const response_movies = await fetch(url_movies, options_movies);
    let data = await response_movies.json()

    data = data.results.map(movie => {
        return {
            tmdbId: movie.id,
            title: movie.original_title,
            description: movie.overview,
            rating: movie.vote_average,
            imageUrl: `${process.env.TMDB_IMAGE_URL}${movie.poster_path}`,
            status: "soon",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    console.log(data);
}

fetch();


