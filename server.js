'use strict';
const express = require('express');
const superagent = require('superagent');
const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')


// load env vars =====================
require('dotenv').config;
const PORT = process.env.PORT;
//====================================

app.get('/', function (req, res){
  res.send('hello to you world, hope you are having a nice day.');
});

app.get('/hello', function (req,res){
  res.send('is it working');
  res.render('views/pages/index.ejs');
});

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
});

