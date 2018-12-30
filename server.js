'use strict';

const express = require('express');
const superagent = require('superagent');
// const ejs = require('ejs');
const app = express();


app.use(express.urlencoded({extended: true,}));

app.set('view engine', 'ejs');

// load env vars =====================
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.static('/public'));
//====================================

//======================================================================
app.get('/', home);

app.post('/searches', search);

function home(req, res){
  res.render('pages/index');
}

function search(req, res){
  // console.log(req.body.search)
  const searchStr = req.body.search[0];
  const searchType = req.body.search[1];
  let URL = 'https://www.googleapis.com/books/v1/volumes?q=';

  if(searchType === 'title'){
    URL += `+intitle:${searchStr}`;
  } else if(searchType === 'author'){
    URL += `+inauthor:${searchStr}`;
  }

  return superagent.get(URL)
    .then(result => {
      let books = result.body.items.map(book => new Book(book.volumeInfo));
      // console.log(books);
      res.render('pages/searches/show', {books});
    })
    .catch(err => console.error(err));
}

function Book(book){
  const placeholder = 'https:/i.imgur.com/J5LVHEL.jpeg';
  this.title = book.title || 'This book does not have a title';
  this.image = book.imageLinks ? book.imageLinks.smallThumbnail : placeholder;
}
//======================================================================

// app.get('/', function (req, res){
//   res.send('hello to you world, hope you are having a nice day.');
// });

// app.get('/hello', function (req,res){
//   app.use(express.static('public'));
//   res.send('is it working');
//   res.render('./views/pages/test.ejs');
// });


// app.get('/hello', function (req,res){



//   res.send('is it working');

//   res.render('pages/index');
// });

// // app.use(express.static('./test.html'));

// app.get('/test', function (req,res){
//   res.send('is it working');
//   // app.set('view engine', 'html');
//   res.render('test.ejs');
//   // app.use(express.static('./test.html'));
// });

app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});

