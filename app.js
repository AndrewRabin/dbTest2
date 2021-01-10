//var createError = require('http-errors');
//var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var wikiRouter = require('./routes/wiki.js');
//var catalogRouter = require('./routes/catalog');

//var app = express();

/////////////// DB /////////////////////////////////////////

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://dbAdmin:dbAdmin@cluster0.e1tui.mongodb.net/dbTest?retryWrites=true&w=majority';
//var client = new MongoClient(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongoDB, { useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var testSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        age: {type: Number},
    }
);

var testModel = mongoose.model('Test', testSchema);

var testRecord = new testModel(
  {
      first_name: "Billy",
      family_name: "Jobs",
      age: 85
  });

testRecord.save(function (err) {
  if (err) { return next(err); }
  // Successful - redirect to new author record.
  console.log("Success");
});

// the last one is not presented in a list!
testModel.find(function f(err, results){
  if (err) {
    console.log("FIND ERROR");
    return;
  }

  for(var resul of results)
    console.log(resul.id);

});







////////////////////////////////////////////////////////////

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.use('/wiki', wikiRouter);
// app.use('/catalog', catalogRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
  
//   //res.render('error', {message: "oooooops"});
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;




// run from terminal
// $ENV:DEBUG = "LocalLibrary:*"; npm start
//
// compass
// mongodb+srv://dbUser:<password>@cluster0.duzcf.mongodb.net/test

//terminal
// mongo "mongodb+srv://cluster0.duzcf.mongodb.net/dbLibrary" --username dbUser
