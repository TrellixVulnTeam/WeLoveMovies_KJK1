if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// error imports
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

// router imports
const moviesRouter = require("./components/movies/movies.router")
const reviewsRouter = require("./components/reviews/reviews.router")
const theatersRouter = require("./components/theaters/theaters.router")

// Application call begins

// CORS is called to be used by Express.
app.use(cors())
// Data is parsed to JSON format.
app.use(express.json())
// Movies route is initalized.
app.use("/movies", moviesRouter)
// Reviews route is initalized.
app.use("/reviews", reviewsRouter)
// Theaters route is initalized.
app.use("/theaters", theatersRouter)
// errors
app.use(notFound)
app.use(errorHandler)


module.exports = app;
