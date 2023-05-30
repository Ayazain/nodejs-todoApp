const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const AppError = require("../Utls/AppError");
const jwt  = require('jsonwebtoken')


getOneUserByID = async (req, res, next) => {
  let { id } = req.params;
  let user = await User.findById(id);
  if (!user) {
    let err = new AppError("this email not exist", 404);
    err.status = 400;
    return next(err);
  }
  res.send(user);
};
getAllUsers = async (req, res, next) => {
  let allUsers = await User.find();
  if (!allUsers || allUsers.length == 0) {
    let err = new AppError("there is no Users", 404);
    err.status = 400;
    return next(err);
  }
  res.send(allUsers);
};
signUp = async (req, res, next) => {
  let { email, password } = req.body;
  let newUser = await User.create({ email, password });

  res.send(newUser);
};

signIn = async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("user not found ", 404));
  let match = await user.checkPassward(password);
  user.password = undefined;
  if (match)  
  {
    let token  = jwt.sign({id: user._id  } ,process.env.SECRET_KEY );
    res.send({user , token});
  }
  else return next(new AppError("Wrong Passward ", 404));
};
module.exports = { getAllUsers, getOneUserByID, signUp, signIn };
