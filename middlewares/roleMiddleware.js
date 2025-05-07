const AppError = require('../utils/AppError');

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) =>{
        const userRole = req.user.role;
        if(!allowedRoles.includes(userRole)) {
            return next(new AppError('unauthorized', 403));
        }
        next();
    }
}

module.exports = { authorizeRole };
