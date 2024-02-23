const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require('cors');
const endpoints = require('./routes/endpoints');
const session = require('client-sessions');

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'myveryfirstemailwasblueblankeyiscute@yahoo.com',
  cookieName: 'session',
  duration: 60 * 60 * 1000 
}));

const { logout, checkAuth } = require('./middlewarHelper.js');

app.get('/session', checkAuth);
app.delete('/session', logout);

// MongoDB connection (ingredients and restrictions)
mongoose.connect('mongodb://db:27017/WSIE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//test
app.get("/", (req, res) => {
  res.json({ msg: "data goes here" });
});

app.use('/api/v1', endpoints);

module.exports = app;