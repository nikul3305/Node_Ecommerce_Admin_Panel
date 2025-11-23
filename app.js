// Core Modules
const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000 ;

// Express App
const app = express();

// DataBase Connection
const dbConnect = require('./config/connect');

// Middleware: Parses form data
const bodyParser = require('body-parser');

// Template Engine
const engine = require('ejs-blocks');

// Session & Cookie Management
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Flash Message
const flash = require('connect-flash');
require('dotenv').config();

 // Route
const router = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRouter');
const categoryRoutes = require('./routes/categoryRoutes');

// View Engine Setup(EJS Template)
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse JSON and Form Data
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//Public Folder Path
app.use(express.static(path.join(__dirname, 'public')));

// Session and Cookie Middleware
app.use(cookieParser('NotSoSecret'));
app.use(session({secret: 'not_secret_key', resave: false, saveUninitialized: true}));

// Flash Message Middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    next();
});

// Connect to Database
dbConnect();

// Routes
app.use('/', router);  //Admin Router
app.use('/', productRoutes);  //Product Router
app.use('/', categoryRoutes); //Category Router

// App Running on Port
app.listen(port,()=> {
    console.log(`Server started on port ${port}`);
});

// 404 page
app.use((req, res)=>{
    res.status(404).render('404_page');
})