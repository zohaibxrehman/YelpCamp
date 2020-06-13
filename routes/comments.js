var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require("../middleware");

// new comment form
router.get('/new', middleware.isLoggedIn, function(req, res) {
	// find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			req.flash("error", err.message);
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

// create new comment
router.post('/', middleware.isLoggedIn, function(req, res) {
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			req.flash("error", err.message);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash("error", "Something went wrong.");
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added comment.");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// edit comment page
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err) {
			req.flash("error", err.message);
			res.redirect('back');
		} else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// update comment
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			req.flash("error", err.message);
			res.redirect('back');
		} else {
			req.flash("success", "Comment edited.");
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect('back');
		} else {
			req.flash("success", "Comment deleted");
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
