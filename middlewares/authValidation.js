const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const verifyToken = (req, res, next) => {
    try{
    let token;
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        token = authHeader.split(' ')[1];
        if (!token){
            return next(new AppError('Token Not Found', 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }else{
        return next(new AppError('access denied', 401))
    }
    }catch (error) {
        return next(new AppError('Invalid oken'))
    }
}

module.exports = verifyToken;