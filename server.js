const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now=new Date().toString();
  var log=`${now}: ${req.method}${req.url}`;
  console.log(log);
  // console.log(`${now}: ${req.method}${req.url}`);
  fs.appendFile('Server.log',log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    };
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs',{
//     maintenanceMessage: `Something's not quite right`
//     next();
//   })
// });

app.use(express.static(__dirname + '/public')); //this is a middleware, which makes express work a little differently.


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})                                                //here we have put function of express i.e. express.static. It takes the absolute path to the folder we want to serve up

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {     //registering a handler for http get request, we used / bcause we are looking for root of the app, second function is the one to be run, it tells what to send back
  // res.send('<h1>Hello Express!<h1/>');                              //'req' stores info on requests coming in. things like header used, bod info etc. 'res' is response for reuqest in whatever way you like
res.render('home.hbs',{
  pageTitle: 'About page',
  welcomeNote: 'Welcome to the website',
  currentYear: new Date().getFullYear()

  });
  // res.send({
  //   name: 'Pranav',
  //   likes: [
  //     'boking',
  //     'cities'
  //   ]
  // });
});

app.get('/about', (req,res) => {  //we need not only stick to route route method
res.render('about.hbs', {
  pageTitle: 'About page',
  currentYear: new Date().getFullYear()
});
  // res.send('About page');
});

app.get('/project', (req,res) => {  //we need not only stick to route route method
res.render('project.hbs', {
  pageTitle: 'Project page',
  currentYear: new Date().getFullYear()
});
  // res.send('About page');
});

app.get('/bad',(req,res) => {
  res.send({
  error: 'URL issue',
  properties: [
    'Bad URL',
    'Service do'
  ]
  });
});



app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});   //binds the app to a port in our machine.
