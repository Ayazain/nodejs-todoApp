const express = require("express");
const Router = express.Router();
const {loginMiddleWare , signUpMedelware} = require('../Utls/AuthentcationSchema')

const {
  getAllUsers,
  getOneUserByID,
  signUp,
  signIn,
} = require("../Controlers/AuthentcationControler");
const AppError = require("../Utls/AppError");

Router.get("/", getAllUsers);

Router.get("/:id", getOneUserByID);

Router.post("/", signUpMedelware, signUp);

Router.post("/login", loginMiddleWare, signIn);

module.exports = Router;
