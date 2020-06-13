var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require("../middleware");

// INDEX
router.get('/', function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			req.flash("error", err.message);
		} else {
			res.render('campgrounds/index', { campgrounds: campgrounds });
		}
	});
});

// CREATE
router.post('/', middleware.isLoggedIn, function(req, res) {
	// res.send('Hello bro');
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, image: image, description: desc, author: author };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			req.flash("error", err.message);
		} else {
			req.flash("success", "Added new campground!");
			res.redirect('/campgrounds');
		}
	});
});

// NEW
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

// SHOW
router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			req.flash("error", err.message);;
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
			req.flash("error", err.message);
			res.redirect("/campgrounds");
       } else {
		   //redirect somewhere(show page)
			req.flash("success", "Campground edited.");
			res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground removed.");
			res.redirect("/campgrounds");
		}
   });
});

module.exports = router;
