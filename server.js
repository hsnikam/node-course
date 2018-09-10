const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine','hbs');


hbs.registerPartials(__dirname +'/views/partials')

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method}:${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '\n' ,(err) => {
        if(err){
            console.log('Unable to print the log');
        }
    });
    next();
});


app.use((req,res,next)=>{
    res.render('maintainance.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});


hbs.registerHelper('ScreamIt',(text)=>{
    return text.toUpperCase();
});


app.get('/bad',(req,res)=>{
    res.send({
        ErrorMessage: 'the error acured',
        errorNo: '021'

    });
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
       
    });
});



app.listen(3000,() => {
console.log('server set on port no 3000');
});