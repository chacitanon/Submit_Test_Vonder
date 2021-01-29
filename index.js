require('dotenv').config();
require('mongoose').connect(process.env.MONGO_DB);
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();
require("./passport");

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);
app.use('/room', roomRoutes);
app.get('/mock-data', (req, res) => {
  require('./seeder/seeder');
  res.send('Data imported');
});

app.listen(7000, () => {
  console.log('Running on port 7000');
});