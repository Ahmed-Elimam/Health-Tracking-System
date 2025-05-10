const AppError = require("../utils/AppError")

const checkOwnership = (req, res, next) => {
    const loogedUserId = req.user.id
    const userRole = req.user.role
    const reqUserId = req.param.id

    if(userRole == "admin" || userRole == "super-admin"){
        return next();
    }
    
    if(loogedUserId == reqUserId){
        return next();
    }
    else{
        return next(new AppError("Not authorized", 403));
    }
}

module.exports = {
    checkOwnership
}