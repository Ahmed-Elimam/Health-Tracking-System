const AppError = require("../utils/AppError");

const checkOwnership = (req, res, next) => {
  const loggedUserId = req.user.id;
  const userRole = req.user.role;
  const reqUserId = req.params.id;

  if (userRole == "admin" || userRole == "super-admin") {
    return next();
  }

  if (loggedUserId == reqUserId) {
    return next();
  } else {
    return next(new AppError("Not authorized", 403));
  }
};

module.exports = {
  checkOwnership,
};
