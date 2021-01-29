const mongoose = require('mongoose');
const restRoomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  left: Number,
  isActive: Boolean,
  location: {
    latitude: Number,
    longitude: Number
  }
});
const RestRoom = mongoose.model('RestRoom', restRoomSchema);

module.exports = RestRoom;