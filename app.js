var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	seed = require('./seed'),
	Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

seed();

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

app.listen(3000, function() {
	console.log('The YelpCamp serving on PORT 3000');
});
