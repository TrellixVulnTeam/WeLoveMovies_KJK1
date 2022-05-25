
// Import service runtime requirements.
const knex = require("../../db/connection");
const reduceProperties = require("../../utils/reduce-properties");
const theater = "theaters as t";

// reducing middleware
const reducer = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
  });

// req to list theaters
function list() {
    return knex(theater)
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .then(reducer);
};

module.exports = {
    list,
};


