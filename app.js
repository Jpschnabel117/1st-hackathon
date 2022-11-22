const express = require('express');
const mongoose = require("mongoose")
const path = require('path')
const app = express();
//const os=require('os')
const MONGODB_URI = process.env.MDB_URI
console.log(MONGODB_URI, "mongo uri")



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index')
app.use('/', indexRouter);


//errors
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



mongoose
  .connect(MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


module.exports = app;


