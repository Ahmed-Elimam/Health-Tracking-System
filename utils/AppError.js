class AppError extends Error {
    constructor(message, statusCode = 500, errors = []) {
        super(message);
        this.statusCode = statusCode; // Default to 500 if no status code is provided
        this.errors = errors; // Default to null if no errors are provided
    } 
}

module.exports = AppError;


