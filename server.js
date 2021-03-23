require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));

const mongoURI = process.env.MONGODBURI
const db = mongoose.connection;

mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("database connection checked");
})

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}
//Controllers go here 

const cheatsheetControllers = require('./controllers/cheatsheets')
app.use('/cheatsheets', isAuthenticated, cheatsheetControllers);

const userControllers = require('./controllers/users')
app.use('/users', userControllers);

const sessionsControllers = require('./controllers/sessions')
app.use('/sessions', sessionsControllers);


app.get('/', (req, res) => {
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
    console.log(currentUser)
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})