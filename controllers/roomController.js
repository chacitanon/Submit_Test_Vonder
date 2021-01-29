const RestRoom = require("../models/RestRoom");

const getAllRoom = async (req, res) => {
  const rooms = await RestRoom.find({});
  res.status(200).send(rooms);
};

const booking = async (req, res) => {
  const { restRoomId } = req.body;
  const getBook = await RestRoom.findOne({ _id: restRoomId, isActive: true, left: { $gt: 0 } });
  if (getBook) {
    await getBook.update({
      left: getBook.left - 1
    });
    res.send("Booking success");
  } else {
    res.send("Can't find");
  }
};

module.exports = {
  getAllRoom,
  booking
};