const AppError = require('../utils/AppError');
/**
 * Middleware to validate request body against a Joi schema
 * @param {Joi.Schema} schema - Joi schema to validate against
 * @returns {Function} Express middleware function
 */
const validateRequest = schema => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            // If validation fails, send a 400 response with the error message
            next(new AppError(error.message, 400));
        }
        // Attach the validated value to the request object
        req.body = value;
        next();
    };
};

module.exports = validateRequest;
