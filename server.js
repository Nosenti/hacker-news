const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'The site is under Construction',
//     warningMessage: 'if you think it is an error, you can ask the owner of the website'
//   })
//
// });

app.get('/',(req,res)=>{
  res.send('Home Page')
});

app.get('/search',(req,res) => {
  res.send('Search Page');
});

//hbs.registerPartials(__dirname+'/views/partials')
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/home',(req,res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to our Website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/project',(req,res) => {
  res.render('project.hbs',{
    pageTitle:'This is my portfolio',
    Message:'Together we can do great things, stay in touch!!!',
    currentYear: new Date().getFullYear()
  });
});

app.get('/menu',(req,res) => {
  res.send('<h1>Here is the menu</h1>');
});

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(port,()=>{
  console.log('Server is up on the port ${port}')
});
