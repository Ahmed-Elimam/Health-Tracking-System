const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';
    let errors = err.errors || [];
  
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation failed';
      errors = Object.values(err.errors).map(e => e.message);
    }
  
    // Handle duplicate key errors (like unique email/nationalId)
    if (err.code === 11000) {
      statusCode = 400;
      message = 'Duplicate key error';
      errors = Object.keys(err.keyValue).map(field => `${field} already exists`);
    }
  
    res.status(statusCode).json({
      statusCode,
      message,
      errors,
    });
  };
  
  module.exports = errorHandler;
  