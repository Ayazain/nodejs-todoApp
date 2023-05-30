const express  = require('express')
const Router  = express.Router() ;

const Todo = require('../Models/Todo')
const verifyToken = require('../Utls/verifyToken');
const AppError = require('../Utls/AppError');

Router.get('/one',verifyToken ,async (req , res )=> 
{
    let todo  = await Todo.find({user:req.user._id}).populate('user'); 
    res.send(todo);
} ) 

Router.get('/',verifyToken ,async (req , res )=> 
{
    let todo  = await Todo.find().populate('user'); 
    res.send(todo);
} ) 


Router.post('/' , verifyToken ,async (req, res, next)=>{
  let {title , status } = req.body ; 
  if(!title  ) return next(new AppError("plz provide title and statuse" , 404)); 
  let todo  =await Todo.create({title , status ,user: req.user._id });
   res.send(todo);
})


module.exports  =  Router ;