var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var multer = require('multer');
const formidable = require('formidable');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.use(require('express-session')({
    resave:false,
    saveUninitialized:true,
    secret: 'secret code',
    cookie:{
      httpOnly:true,
      secure:false
    }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member_insert',require('./routes/member_insert'));
app.use('/login',require('./routes/login'));
app.use('/logout',require('./routes/logout'));
app.use('/photo_insert',require('./routes/photo_insert'));
app.use('/modify',require('./routes/modify'));
app.use('/member_delete',require('./routes/member_delete'));


app.post('/upload', function (req, res) {    
  console.log("==========");
  console.log(req.session.photo_path);
  
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.id_photo_name.path;
    var newpath = 'public/upload/' + req.session.login_id + '_' +files.id_photo_name.name;
    req.session.newpath=newpath;
    req.session.loginState=false;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.redirect("/");
      res.end();
    });
  });
});


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
