require('import-export');
const express = require('express')
const exphbs  = require('express-handlebars');
const {
	defaultLocations,
	getFoursquareVenues,
} = require('./data.js');
const {
	foursquareCategories,
	ideas,
	venueIdeas,
} = require('./ideas.js');


// express config
const app = express();

const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        selected: function(foo, bar) {
		  	return foo == bar ? ' selected' : '';
		},
		testhelper: function(){
			return 'test test'
		}
    },
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')


const getVenuesForLocation = (categories, radius, lat, lon, locationName) => {
	let categoriesString = '';
	categories.forEach((category)=>{
		categoriesString += `${foursquareCategories[category]},`;
	})
	return getFoursquareVenues(categoriesString, radius, lat, lon)
		.then((venues)=>{
			console.log(`${locationName} ${venues.length}`);
			return {name: locationName, venues: venues}
		});
}

const getVenueCalls = (idea) => {
	const venueCalls = [];
	for (key in defaultLocations) {
		const location = defaultLocations[key];
		venueCalls.push( getVenuesForLocation( idea.categories, idea.radius, location.latitude, location.longitude, location.city ) );
	};
	return venueCalls;
}


// routes
app.get('/', function (req, res) {

	const ideaIndex = req.query.ideaIndex || 0;
	const idea = venueIdeas[ideaIndex];
	const venueCalls = getVenueCalls(idea);
	Promise.all(venueCalls)
		.then( (locations) => {
			res.render('home', { ideas: venueIdeas, name: idea.idea, description: idea.description, categories: JSON.stringify(idea.categories), ideaIndex: ideaIndex, locations: locations});
		});
})

app.get('/ideas', function (req, res) {

	const ideaIndex = req.query.ideaIndex || 0;
	const idea = ideas[ideaIndex];
	const venueCalls = getVenueCalls(idea);
	Promise.all(venueCalls)
		.then( (locations) => {
			res.render('home', { ideas: ideas, name: idea.idea, description: idea.description, categories: JSON.stringify(idea.categories), ideaIndex: ideaIndex, locations: locations});
		});
})

// go
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})