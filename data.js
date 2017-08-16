import moment from 'moment';

const foursquareClientId = 'Y1Y51NDFA2GCSXJB00OMXN2QBGGL4ASQLW1OM42BM54KZOKV';
const foursquareClientSecret = 'XHARYWMWQQAHMUFT2UBJYPHFD3DVP44FCK2TWLEQX1F3BXVK';
const weatherUndergroundKey = '99c20c22192a68a5';
const hikingProjectKey = '200121722-610ce10d0a15cbc8f35cc27e96f53bfb';

const foursquareCategories = {
	coffee: '4bf58dd8d48988d1e0931735',
	park: '4bf58dd8d48988d163941735',
	playground: '4bf58dd8d48988d1e7941735',
	library: '4bf58dd8d48988d12f941735',
	bar: '4bf58dd8d48988d116941735',
	fire: '4bf58dd8d48988d12c941735',
	waterfront: '56aa371be4b08b9a8d5734c3',
	beach: '4bf58dd8d48988d1e2941735',
	trail: '4bf58dd8d48988d159941735',
	dogs: '4bf58dd8d48988d1e5941735',
	indoorPlayArea: '4bf58dd8d48988d15e941735',
	farm: '4bf58dd8d48988d15b941735',
	meetingRoom: '4bf58dd8d48988d100941735',
	businessCenter: '56aa371be4b08b9a8d573517',
	communityCollege: '4bf58dd8d48988d1a2941735',
}


export const defaultLocations = {
	austin: {
		latitude: 30.26,
		longitude: -97.74,
		city: 'Austin'
	},
	boise: {
		latitude: 43.61,
		longitude: -116.21,
		city: 'Boise'
	},
	clewiston: {
		latitude: 26.75,
		longitude: -80.93,
		city: 'Clewiston'
	},
	denver: {
		latitude: 39.73,
		longitude: -104.99,
		city: 'Denver'
	},
	london: {
		latitude: 51.50,
		longitude: -0.127,
		city: 'London'
	},
	losangeles: {
		latitude: 34.05,
		longitude: -118.24,
		city: 'Los Angeles'
	},
	minneapolis: {
		latitude: 44.9,
		longitude: -93.2,
		city: 'Minneapolis'
	},
	newyork: {
		latitude: 40.71,
		longitude: -74.005,
		city: 'New York'
	},
	sydney: {
		latitude: -33.86,
		longitude: 151.20,
		city: 'Syndey'
	},
	vancouver: {
		latitude: 49.28,
		longitude: -123.12,
		city: 'Vancouver'
	},

}


export const getForecastsForLatLon = (lat, lon) =>{
	return fetch(`http://api.wunderground.com/api/${weatherUndergroundKey}/hourly10day/q/${lat},${lon}.json`)
      	.then((response) => response.json())
      	.then((json) => json.hourly_forecast);
}

export const findTimeStampInForecasts = (timestamp, forecasts) =>{
	return forecasts.find((forecast)=>{
		return forecast.FCTTIME.epoch == timestamp;
	});
}

// FOURSQUARE GET VENUE
export const getFoursquareVenue = (venueId) => {
    return fetch(`https://api.foursquare.com/v2/venues/${venueId}?&client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20170801`)
      	.then((response) => response.json());
};

// FOURSQUARE GET VENUES
// "search" api supports categoryIds, "explore" doesn't
// most recommendations can probably use a default smaller radius, but field trips need larger (ie farm trip)
// venue params come from the .where in each idea object
// filtering out garbage venues by:
// no venues with less than 3 unique checkins
// no venues without an explicit street address
export const getFoursquareVenues = (categoryId, radiusMeters = 8000, lat, lon) => {
    return fetch(`https://api.foursquare.com/v2/venues/search?radius=${radiusMeters}&ll=${lat},${lon}&categoryId=${categoryId}&client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20170801&limit=8`)
      	.then((response) => {
      		return response.json();
      	})
      	.then((json) => {
      		if(json.response && json.response.venues){
      			const venues = json.response.venues.filter((venue) => {
      				// filter out very questionable venues
      				let keep = true;
      				if (venue.stats.usersCount <= 3) // not enough checkins
      					keep = false;
      				if (!venue.location || !venue.location.address) // no usable address
      					keep = false;
      				return keep;
      			});
      			return venues;
      		}
      		else{
      			return [];
      		}
      	});
};

export const getHikingProjectTrails = (lat, lon) => {
	return fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&key=${hikingProjectKey}`)
	.then((response)=>{
		return response.json();
	})
	.then((json) => {
		if(json.trails){
			return json.trails;
		}
		else{
			return [];
		}
	});
};

export const getSuggestedMoment = (day, hour, weeksOut) => {
	return moment().startOf('week').add(weeksOut, 'w').add(day, 'd').hour(hour).minutes(0);
}

export const daysOfWeekPlural = [
	'Sundays',
	'Mondays',
	'Tuesdays',
	'Wednesdays',
	'Thursdays',
	'Fridays',
	'Saturdays'
]


export const data = {



	// ******************
	// parenting

	parenting: {
		getName: (city) => (`${city} Parents Collective`),
		label: 'Parenting',
		photo: 'https://secure.meetupstatic.com/photos/event/8/9/4/8/highres_463715144.jpeg',
		duotonePhoto: 'https://secure.meetupstatic.com/photos/event/8/a/9/9/highres_463715481.jpeg',
		ideas: [
			{
				title: "Ice Cream Social",
				howManyGroups: 43,
				pastMeetups: [
					{
						title: "Let's get some Ice Cream for Hunter's Birthday!",
						groupName: "MOMS Club of Mount Olive",
						attended: 18,
						photo: "http://photos1.meetupstatic.com/photos/event/9/5/f/2/event_459338386.jpeg"
					},
					{
						title: "Ice cream social and pool playdate",
						groupName: "Huron Valley Moms' Club",
						attended: 29,
						photo: "https://secure.meetupstatic.com/photos/event/8/2/9/8/event_357993432.jpeg"
					},
					{
						title: "Banana Splits!!!",
						groupName: "Tiny Tots of Surprise",
						attended: 12,
						photo: "https://secure.meetupstatic.com/photos/event/d/9/c/0/event_460135744.jpeg"
					},
					{
						title: "A Sweet Goodbye (an Ice Cream Party)",
						groupName: "Positive Moms of Newport",
						attended: 31,
						photo: "http://photos1.meetupstatic.com/photos/event/b/5/6/event_328922902.jpeg"
					},
				],
				description: "Get your summer ice cream fix. Kids can’t get enough of a toppings buffet and parents get a chance to slow down and soak in the last of summer rays. Ask your members to each bring a special topping for a deluxe variety—it’s a great conversation starter.",
				agenda: [
					{ label: 'Setup', minutes: 20},
					{ label: 'Meet and greet', minutes: 5},
					{ label: 'Ice cream scooping', minutes: 10},
					{ label: 'Toppings decorating', minutes: 20},
					{ label: 'Kids games', minutes: 30},
					{ label: 'Free play and chat', minutes: 30},
				],
				where: {
					categoryId: `${foursquareCategories.park},${foursquareCategories.playground}`,
					description: "Parks, Playgrounds, Backyards"
				},
				when: {
					options: [
						{day: 6, hour: 15},
						{day: 0, hour: 15},
						{day: 5, hour: 18},
					],
					description: "weekends around 3:00pm"
				},
				duration: {
					options: [
						"1 hour",
						"2 hours",
						"3 hours"
					],
					description: "2 hours"
				},
				tips: [
					{
						authorName: 'Ming',
						authorGroupName: 'Babies and Babes Raleigh',
						quote: 'We gave ours a 50s costume theme and the turnout was hilarious',
						authorPhoto: 'https://randomuser.me/api/portraits/women/1.jpg'
					},
					{
						authorName: "Madeline",
						authorGroupName: "Vegan Moms Chicago",
						quote: "Sugar-free toppings and coconut ice cream was such a healthy way to reinvent this classic.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/2.jpg'
					},
					{
						authorName: "Janet",
						authorGroupName: "Parents Without Partners Manchester",
						quote: "I massively underestimated how many people would bring chocolate syrup so next time I’d create a Google Doc to capture what everyone’s bringing beforehand.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/3.jpg'
					},
					{
						authorName: "Matt",
						authorGroupName: "Parents of Burnsville",
						quote: "Don’t forget napkins!!",
						authorPhoto: 'https://randomuser.me/api/portraits/men/4.jpg'
					},
					{
						authorName: "Lisa",
						authorGroupName: "Mommy & Me Montana",
						quote: "Pre-scooping the ice cream can save a lot of time.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/5.jpg'
					},
				]
			},

			{
				title: "Park Playdate",
				howManyGroups: 87,
				pastMeetups: [
					{
						title: "All Ages Play Date",
						groupName: "MOMS Club of Kansas City",
						attended: 14,
						photo: "http://photos1.meetupstatic.com/photos/event/8/a/c/a/event_458135530.jpeg"
					},
					{
						title: "Colorful Playdate and Snacks",
						groupName: "Menifee Mom's Group",
						attended: 12,
						photo: "https://secure.meetupstatic.com/photos/event/8/9/1/7/600_463355095.jpeg"
					},
					{
						title: "Let's let the littles play!",
						groupName: "Moms-n-Munchkins of Northwest Columbus",
						attended: 13,
						photo: "https://secure.meetupstatic.com/photos/event/4/d/9/9/600_1219865.jpeg"
					},
					{
						title: "Mardi Gras play date",
						groupName: "SouthWest Vegas Mommies and Kids",
						attended: 17,
						photo: "https://secure.meetupstatic.com/photos/event/4/a/a/8/event_253279112.jpeg"
					},
				],
				description: "Let the little ones unleash all that pent up energy at a park playdate, no matter their age. You get a dose of fresh air and Vitamin D while they get a break from the structure of home or school. Set up a game of tag, make a rock scavenger hunt, or have a free-for-all on the playground. Don't forget sunscreen.",
				agenda: [
					{ label: 'Meet and greet', minutes: 10},
					{ label: 'Kids playtime', minutes: 30},
					{ label: 'Snacks and chats', minutes: 20},
					{ label: 'Kids playtime', minutes: 30},
					{ label: 'Goodbyes', minutes: 10},
				],
				where: {
					categoryId: `${foursquareCategories.playground}`,
					description: "Parks with playgrounds"
				},
				when: {
					options: [
						{day: 2, hour: 16},
						{day: 0, hour: 12},
						{day: 6, hour: 9},
					],
					description: "weekend mornings and middays"
				},
				duration: {
					options: [
						"1 hour",
						"2 hours",
						"3 hours"
					],
					description: "2 hours"
				},
				tips: [
					{
						authorName: 'Sally',
						authorGroupName: 'Bushwick Moms',
						quote: 'We bring sidewalk chalk sometimes and they are just enthralled for hours.',
						authorPhoto: 'https://randomuser.me/api/portraits/women/1.jpg'
					},
					{
						authorName: "Peter",
						authorGroupName: "Vegan Moms Chicago",
						quote: "Fruit and trail mix are great snacks for the park that everyone can enjoy.",
						authorPhoto: 'https://randomuser.me/api/portraits/men/2.jpg'
					},
					{
						authorName: "Jan Quin",
						authorGroupName: "SF Marina Mommies",
						quote: "Try to end on a high note and leave while everyone is having fun. This way the kids remember it being an awesome time and will be excited to do it again.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/3.jpg'
					}
				]
			},

			{
				title: "Farm Field Trip",
				howManyGroups: 32,
				pastMeetups: [
					{
						title: "Field Trip to Green Acres Farm!",
						groupName: "Huron Valley Moms' Club",
						attended: 14,
						photo: "https://a248.e.akamai.net/secure.meetupstatic.com/photos/event/d/a/9/event_458575960.jpeg"
					},
					{
						title: "Fulper Dairy Farm Tour",
						groupName: "Best Friends Play Time",
						attended: 12,
						photo: "https://secure.meetupstatic.com/photos/event/1/6/6/3/event_463565731.jpeg"
					},
					{
						title: "Let's Take a Tour of Tomalchoff Farms",
						groupName: "Tiny Tots of Surprise",
						attended: 13,
						photo: "https://secure.meetupstatic.com/photos/event/b/0/c/c/600_460005260.jpeg"
					},
					{
						title: "Hemmer Hill Sheep Farm Tour",
						groupName: "Louisville Mama & Me Playgroup",
						attended: 17,
						photo: "https://secure.meetupstatic.com/photos/event/a/9/a/e/highres_461083438.jpeg"
					},
				],
				description: "Take a field trip to see the local animals or plants at a nearby farm. Some pick fruits or vegetables at orchards or pumpkin patches, while others pet and feed the barn animals at local farms. No matter what you choose, don't forget to wear the appropriate shoes—it can get messy out there.",
				agenda: [
					{ label: 'Gather at meeting point', minutes: 10},
					{ label: 'Carpool to farm', minutes: 0},
					{ label: 'Arrivals', minutes: 10},
					{ label: 'Explore the farm', minutes: 40},
					{ label: 'Snacks and chat', minutes: 20},
					{ label: 'Goodbyes', minutes: 10},
					{ label: 'Carpool home', minutes: 0},
				],
				where: {
					categoryId: `${foursquareCategories.farm}`,
					description: "Farms, orchards and greenhouses",
					radiusMeters: 120000
				},
				when: {
					options: [
						{day: 6, hour: 10},
						{day: 0, hour: 11},
						{day: 0, hour: 12},
					],
					description: "weekend middays"
				},
				duration: {
					options: [
						"1 hour",
						"2 hours",
						"3 hours"
					],
					description: "3 hours"
				},
				tips: [
					{
						authorName: 'Sally',
						authorGroupName: 'Madision North Moms',
						quote: 'Wet wipes went along away for dirty hands and faces.',
						authorPhoto: 'https://randomuser.me/api/portraits/women/8.jpg'
					},
					{
						authorName: "David",
						authorGroupName: "Kansas City Kids",
						quote: "Dress for the weather. Bring a hat, sunscreen, and water if the weather is warm; dress in layers if it’s cold.",
						authorPhoto: 'https://randomuser.me/api/portraits/men/4.jpg'
					},
					{
						authorName: "Erica Martinez",
						authorGroupName: "Not Your Average Stay-at-home Moms",
						quote: "It was hard to keep track of personal items so we made sure everyone's name was on their bag just incase things got lost or left behind.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/9.jpg'
					}
				],
			},
			{
				title: "Potluck",
				howManyGroups: 32,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "http://photos4.meetupstatic.com/photos/event/5/e/3/a/event_363564122.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Picnic",
				howManyGroups: 64,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "https://secure.meetupstatic.com/photos/event/4/f/e/e/event_388340462.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Nature Walk",
				howManyGroups: 46,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "http://photos3.meetupstatic.com/photos/event/7/e/7/event_451802023.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Moms Dinner",
				howManyGroups: 52,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "https://secure.meetupstatic.com/photos/event/1/5/b/9/event_443885561.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Science Field Trip",
				howManyGroups: 37,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "https://secure.meetupstatic.com/photos/event/e/1/d/2/event_448857810.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Craft Making",
				howManyGroups: 68,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "http://photos2.meetupstatic.com/photos/event/2/2/a/8/event_451028872.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Storytime",
				howManyGroups: 102,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "http://photos3.meetupstatic.com/photos/event/6/6/2/7/event_459386151.jpeg"
				},
				],
				notFinished: true
			},
			{
				title: "Kids Movie Party",
				howManyGroups: 8,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "https://s-media-cache-ak0.pinimg.com/564x/8d/41/19/8d41197830c6a11c77d92eef80b132f0.jpg"
				},
				],
				notFinished: true
			},
		]
	},

	// TECH

	tech: {
		getName: (city) => (`${city} Tech Meetup`),
		label: 'Tech',
		photo: 'https://secure.meetupstatic.com/photos/event/8/9/4/8/highres_463715144.jpeg',
		duotonePhoto: 'https://secure.meetupstatic.com/photos/event/8/a/9/9/highres_463715481.jpeg',
		ideas: [
		],
		notFinished: true
	},


	// HIKING

	hiking: {
		getName: (city) => (`${city} Hikers Meetup Group`),
		label: 'Hiking',
		photo: 'https://secure.meetupstatic.com/photos/event/8/9/4/8/highres_463715144.jpeg',
		duotonePhoto: 'https://secure.meetupstatic.com/photos/event/8/a/9/9/highres_463715481.jpeg',
		ideas: [
		],
		notFinished: true
	}
}



export const store = {
	newEvent: {}
};
