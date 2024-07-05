const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

require("dotenv").config();

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require("./routes/index")

const db = require('./config/mongoose-connection');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.JWT_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs")

app.use("/", indexRouter)
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000)
