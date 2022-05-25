
// Import service runtime requirements.
const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");
const table = "movies";
const theaterTable = "movies_theaters";
const reviews = "reviews";

// Default list query.
function list() {
    return knex(table).select("*");
};

// list query for current showings.
function currentShowingsList() {
    return knex(`${table} as m`)
        .join("movies_theaters as t", "m.movie_id", "t.movie_id")
        .select("m.*")
        .where({ "t.is_showing": true })
        .groupBy("m.movie_id");
};

// Gather single ID information from query.
function readID(movie_id) {
    return knex(`${table} as m`)
        .select("*")
        .where({ movie_id: movie_id })
        .first();
};

// Gather theaters showing single ID from query.
function readIDTheaters(movie_id) {
    return knex(`${theaterTable} as m`)
        .join("theaters as t", "t.theater_id", "m.theater_id")
        .select("t.*")
        .where({ "m.movie_id": movie_id });
};

// readReviews Critic mapping middleware
const mapCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

// Selecting reviews from single ID query
function readIDReviews(movie_id) {
    return knex(`${reviews} as r`)
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({"r.movie_id": movie_id})
        .then(reviews => reviews.map(review => mapCritic(review)));
};

module.exports = {
    list,
    currentShowingsList,
    readID,
    readIDTheaters,
    readIDReviews
}