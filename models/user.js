const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
    // address is not required until the customer makes an order
  }
});

// Define the hashPassword method as an instance method
userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Define the comparePasswords method as an instance method
userSchema.methods.comparePasswords = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
