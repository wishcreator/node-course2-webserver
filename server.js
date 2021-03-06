const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('SOmewthing wrong');
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render('maintance.hbs',{
//     pageTitle: 'maintance Page'
//   });
// });

app.get('/',(req, res) => {
  res.render('home.hbs',{
    welcome: 'Welcome!',
    pageTitle: 'Home Page'
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    statusCode: 400,
    errorMessage: 'Page not found'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    pageTitle: 'Portfolio',
    portfolio: 'Portfolio page here'
  });
});

app.listen(port, () => {
  console.log('Server is running');
});