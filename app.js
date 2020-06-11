var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	seed = require('./seed'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hello123",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seed();

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX
app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campground/index', { campgrounds: campgrounds });
		}
	});
});

// CREATE
app.post('/campgrounds', function(req, res) {
	// res.send('Hello bro');
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = { name: name, image: image, description: desc };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log('err');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

// NEW
app.get('/campgrounds/new', function(req, res) {
	res.render('campground/new');
});

// SHOW
app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campground/show', { campground: foundCampground });
		}
	});
});

// COMMENT ROUTES
app.get('/campgrounds/:id/comments/new', function(req, res) {
	// find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

app.post('/campgrounds/:id/comments', function(req, res) {
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// show register form
app.get("/register", function(req, res){
	res.render("register"); 
 });

 // register logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
		res.redirect("/campgrounds"); 
		});
	});
});

app.listen(3000, function() {
	console.log('The YelpCamp serving on PORT 3000');
});
