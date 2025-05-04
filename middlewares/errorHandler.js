const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong!',
        errors: err.errors || [],
    });
};

module.exports = errorHandler;
