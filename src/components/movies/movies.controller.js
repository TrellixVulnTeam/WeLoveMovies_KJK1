const asyncErrorBoundary = require("../../errors/asyncErrorBoundary")
const service = require("./movies.service")


// list call req
async function list(req, res, next) {
    const key = req.query.is_showing
    const fullList = await service.list()
    const isShowing = await service.currentShowingsList()
    const data  = key ? isShowing : fullList
    res.json({ data })
}

// read call req
function read(req, res, next) {
    const data = res.locals.movie;
    res.json({ data })
}

// middleware validator function
async function movieValidator(req, res, next) {
    
    const movie = await service.readID(req.params.movieId)

    if(movie) {
       res.locals.movie = movie;
       return next();
    }

    next({
        status: 404,
        message: "Movie cannot be found"
    })
}

// read theaters currently showing x movie.
async function showingTheaters(req, res, next) {
    const { movieId } = req.params;
    const data = await service.readIDTheaters(movieId);
    res.json({ data });
}

// read the reviews from a certain ID
async function readReviews(req, res, next) {
    const { movieId } = req.params;
    const data = await service.readIDReviews(movieId);
    res.json({ data });
}

module.exports = {
    list,
    read: [asyncErrorBoundary(movieValidator), read],
    showingTheaters: [asyncErrorBoundary(movieValidator), asyncErrorBoundary(showingTheaters)],
    readReviews: [asyncErrorBoundary(movieValidator), asyncErrorBoundary(readReviews)]
}