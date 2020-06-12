var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	seed = require('./seed'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	Campground = require('./models/campground');

// requiring routes
var campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes = require('./routes/comments'),
	indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
app.use(
	require('express-session')({
		secret: 'secret',
		resave: false,
		saveUninitialized: false
	})
);

// passport set up
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware supplying user info
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});
// seed();

// routes
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, function() {
	console.log('The YelpCamp serving on PORT 3000');
});
