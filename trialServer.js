const express = require('express');
const app = express();

app.get('/', function (req, res){
  res.send('hello to you world, hope you are having a nice day.');
});

app.listen(3000);

