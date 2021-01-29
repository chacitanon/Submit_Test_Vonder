const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  citizenId: { type: String, unique: true },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
