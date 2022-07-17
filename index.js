const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home.ejs', { title: 'Home' });
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue',
        'Rocket',
        'Monty',
        'Stephanie',
        'Wilson'
    ]
    res.render('cats.ejs', { cats });
})

app.get('/rand', (req, res) => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    res.render('random.ejs', { randomNum, title: 'Random number generator' });
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if(data){
        res.render('subreddit.ejs', { ...data, title: data.name });
    } else{
        res.render('pagenotfound', { subreddit, title: 'pagenotfound' });
    }
})

app.listen(8080, () => {
    console.log('Now listening on port 8080!');
})