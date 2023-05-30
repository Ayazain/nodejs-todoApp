const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    requierd: true,
    uniqe: true,
  },
  password: {
    type: String,
    requierd: true,
    select: false,
  },
});
UserSchema.methods.checkPassward = async function (password) {
  let check = await bcrypt.compare(password, this.password);
  return check;
};

UserSchema.pre("save", async function () {
 if ( this.isModified('password'))
this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
