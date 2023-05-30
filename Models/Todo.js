const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    requierd: true,
  },
  status: {
    type: String,
    requierd: true,
    enum: ['todo' , 'done'],
    default:'todo'
  },
  user:
  {
    type :mongoose.Schema.Types.ObjectId ,
    ref:'user',
    requierd:true
  }
});

const todo = mongoose.model("Todo", TodoSchema);
module.exports = todo;
