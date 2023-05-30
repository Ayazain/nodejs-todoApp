const { verify } = require("jsonwebtoken");
const jwt  = require('jsonwebtoken')
const User = require('../Models/User')
module.exports  =  async (req, res , next) => {
    let token  = req.headers.authorization ; 
    const {id}  =  jwt.verify(token , process.env.SECRET_KEY); 
    let user = await User.findOne({_id:id}); 
    req.user = user ; 
    next();
   }

