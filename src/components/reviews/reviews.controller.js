const service = require("./reviews.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

// validation of reviews middleware

async function reviewValidation(req, res, next) {
    const selectedReview = await service.read(req.params.reviewId);
    if(selectedReview){
        res.locals.selectedReview = selectedReview;
        return next();
    };
    next({
        status: 404,
        message: "Review cannot be found."
    });
};

// destory call req
async function destroy(req, res, next) {
    const review = res.locals.selectedReview;
    await service.destroy(review.review_id);
    res.sendStatus(204);
};

// update call req
async function update (req, res, next) {
    const  review  = res.locals.selectedReview;
    const updatedData = req.body.data;

    const updater = {...review, ...updatedData};

    const data = await service.update(updater);

    res.json({ data });
};

module.exports = {
    update: [reviewValidation, asyncErrorBoundary(update)],
    delete: [reviewValidation, asyncErrorBoundary(destroy)]
};