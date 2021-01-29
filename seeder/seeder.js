const mock = require('../mock/mock.json');
const RestRoom = require('../models/RestRoom');

mock.forEach(e => {
  RestRoom.create(e);
});