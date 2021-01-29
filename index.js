require('dotenv').config();
require('mongoose').connect(process.env.MONGO_DB);
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);


app.listen(7000, () => {
  console.log('Running on port 7000');
});