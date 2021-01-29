const route = require('express').Router();
const roomController = require('../controllers/roomController');

route.get('/', roomController.getAllRoom);
route.post('/booking', roomController.booking);

module.exports = route;