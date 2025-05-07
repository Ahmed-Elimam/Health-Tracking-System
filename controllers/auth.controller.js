const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const register = async (req, res, next) => {
    try {
      const {
        firstName, lastName, email, password,
        nationalId, phone, role} = req.body;
      if (!firstName || !lastName || !email || !password || !nationalId || !phone) {
        throw new AppError("All fields are required", 400);}
      await User.validate({ firstName, lastName, email, password, nationalId, phone });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        nationalId,
        phone,
        role
      });
      res.status(201).json({
        message: "User created successfully",
        user: newUser
      });
    } catch (error) {
      next(error); 
    }
  };
  
const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new AppError("Invalid Credentials", 401);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new AppError("Invalid Credentials", 401);
        }
        const token = jwt.sign({id: user._id , role: user.role},process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        next(error);
    }

}

module.exports = {
    register,
    login
}