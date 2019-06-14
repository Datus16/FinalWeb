var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chartsRouter = require('./routes/charts');
var fontawesomeRouter = require('./routes/font-fontawesome');
var themifyRouter = require('./routes/font-themify');
var formsadvancedRouter = require('./routes/forms-advanced');
var formsbasicRouter = require('./routes/forms-basic');
var mapsgmapRouter = require('./routes/maps-gmap');
var mapsvectorRouter = require('./routes/maps-vector');
var pagesRouter = require('./routes/pages');
var tablesRouter = require('./routes/tables');
var widgetsRouter  = require('./routes/widgets');

var app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/charts-chartjs', chartsRouter);
app.use('/font-fontawesome', fontawesomeRouter);
app.use('/font-themify', themifyRouter);
app.use('/forms-advanced', formsadvancedRouter);
app.use('/forms-basic', formsbasicRouter);
app.use('/maps-gmap', mapsgmapRouter);
app.use('/maps-vector', mapsvectorRouter);
app.use('/pages', pagesRouter);
app.use('/tables', tablesRouter);
app.use('/widgets', widgetsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
