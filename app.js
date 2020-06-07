var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
	{
		name: 'Salmon Creek',
		image:
			'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074417c2772d4964fc2_340'
	},
	{
		name: 'Misty Meadows',
		image:
			'https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
	},
	{
		name: 'Holly Hedges',
		image:
			'https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
	}
];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
	// res.send('Hello bro');
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.listen(3000, function() {
	console.log('The YelpCamp serving on PORT 3000');
});
