// const express = require('express');
// const app = express();

// app.get('/', function (req, res){
//   res.send('hello to you world, hope you are having a nice day.');
// });

// app.listen(3000);

const express = require('express');
const supperagent = require('superagent');

const app = express();
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000;


app.get('/', home);

app.post('/searches', search)

function home(req, res){
  res.render('pages/index');
}

function search(req, res){
  const searchStr = req.body.search[0];
  const searchType = req.body.search[1];
  let URL = 'https://www.goolgeapis.com/books/v1/volumes?q='

  if(searchType === 'title'){
    URL += `+intitle:${searchStr}`;
  } else if(searchType === 'author'){
    URL += `+inauthor:${searchStr}`
  }

  return supperagent.get(URL)
    .then(result => {
      let books = result.body.items.map(book => new Book);
      console.log(books)
      res.render('pages/show', {books})
    })

}

function Book(book){
  this.title = book.volume.title || 'Thisw book does not have a title';
}

app.listen(PORT, () => console.log(`app is running on PORT : ${PORT}`))
