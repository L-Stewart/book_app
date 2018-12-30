'use strict';

const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const app = express();


app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// load env vars =====================
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
//====================================

//======================================================================
app.get('/', home);

app.post('/searches', search);

function home(req, res){
  console.log('this path worked');
  res.render('pages/index');
}

function search(req, res){
  const searchStr = req.body.search[0];
  console.log(searchStr);
  const searchType = req.body.search[1];
  console.log(searchType);
  // let URL = 'https://www.goolgeapis.com/books/v1/volumes?q=';
 let URL = `https://www.googleapis.com/books/v1/volumes?q=intitle:{'redwall'}`;
  // if(searchType === 'title'){
  //   URL += `intitle:${searchStr}`;
  //   console.log(URL);
  // } else if(searchType === 'author'){
  //   URL += `inauthor:${searchType}`;
  //   console.log(URL);
  // }

  return superagent.get(URL)
    .then(result => {
      let inquiry = result.body.items;
      console.log(inquiry);
      // let books = result.body.items.map(book => new Book);
      // console.log(books);
      // res.render('pages/searches/show', {books});
    }).catch((error) => console.log(error));
}

function Book(book){
  this.title = book.volume.title || 'Thisw book does not have a title';
  this.placeholderImage = 'https:/i.imgur.com/J5LVHEL.jpeg';
}
//======================================================================
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});