
//hello, here is our current path, we are able to get the string to show up, 'is it working'...



app.get('/hello', function (req,res){
  res.send('is it working');
  res.render('./views/pages/index.ejs');
});


//however, we are getting the following error... so its not finding the path... are you seeing obvious flaws with this?

// (node:8509) ExperimentalWarning: The http2 module is an experimental API.
// running on port: 3000
// Error: Failed to lookup view "./views/pages/index.ejs" in views directory