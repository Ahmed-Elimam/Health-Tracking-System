const authService = require('../services/auth.service');


const register = async (req, res, next) => {
    try {
        const newUser = await authService.registerUser(req.body)
        res.status(201).json({ message: "User created successfully", user: newUser });
    }catch (error) {
        next(error);
    }
};
  
const login = async (req, res, next) => {
    try {
      const { token, fullUserData } = await authService.userLogin(req.body);
      res.status(200).json({ token, user: fullUserData });
    } catch (error) {
      next(error);
    }
  };  

module.exports = {
    register,
    login
}