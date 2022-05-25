
// Import service runtime requirements.
const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");
const reviews = "reviews as r";

// query to read review based on ID
function read(reviewId) {
    return knex(reviews)
    .select("*")
    .where({ review_id: reviewId })
    .first()
};

// query to delete review based on ID
function destroy(reviewId) {
    return knex(reviews)
    .where({"review_id": reviewId})
    .del()
};


// update & middleware helper

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*")
      .then(() => {
        return knex("reviews as r")
          .join("critics as c", "r.critic_id", "c.critic_id")
          .select("*")
          .where({ review_id: updatedReview.review_id })
          .first()
          .then(addCritic);
      });
  }

module.exports = {
    read,
    destroy,
    update,
};