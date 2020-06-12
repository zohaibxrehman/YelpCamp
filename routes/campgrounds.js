var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// INDEX
router.get('/', function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campground/index', { campgrounds: campgrounds });
		}
	});
});

// CREATE
router.post('/', isLoggedIn, function(req, res) {
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
router.get('/new', isLoggedIn, function(req, res) {
	res.render('campground/new');
});

// SHOW
router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campground/show', { campground: foundCampground });
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
