var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});
		}
	});
});

app.post('/campgrounds', function(req, res) {
	// res.send('Hello bro');
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log('err');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.listen(3000, function() {
	console.log('The YelpCamp serving on PORT 3000');
});
