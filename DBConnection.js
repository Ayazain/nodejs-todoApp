
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!')).catch(err=>{console.log(err)});

//  mongodb://127.0.0.1:27017/test