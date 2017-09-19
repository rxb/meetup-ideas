const moment = require('moment');

const foursquareClientId = 'Y1Y51NDFA2GCSXJB00OMXN2QBGGL4ASQLW1OM42BM54KZOKV';
const foursquareClientSecret = 'XHARYWMWQQAHMUFT2UBJYPHFD3DVP44FCK2TWLEQX1F3BXVK';
const weatherUndergroundKey = '99c20c22192a68a5';
const hikingProjectKey = '200121722-610ce10d0a15cbc8f35cc27e96f53bfb';

export const foursquareCategories = {
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
	indoorPlayArea: '5744ccdfe4b0c0459246b4b5',
	farm: '4bf58dd8d48988d15b941735',
	meetingRoom: '4bf58dd8d48988d100941735',
	businessCenter: '56aa371be4b08b9a8d573517',
	communityCollege: '4bf58dd8d48988d1a2941735',
	coworkingSpace: '4bf58dd8d48988d174941735'
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
    return fetch(`https://api.foursquare.com/v2/venues/search?radius=${radiusMeters}&ll=${lat},${lon}&categoryId=${categoryId}&client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20170801&limit=16`)
      	.then((response) => {
      		return response.json();
      	})
      	.then((json) => {
      		if(json.response && json.response.venues){
      			const venues = json.response.venues.filter((venue) => {
      				// filter out very questionable venues
      				const nonPublicCategoryNames = [
      					'Office',
      					'Tech Startup',
      					'Building',
      					'Bank'
      				];
      				let keep = true;
      				if (venue.stats.usersCount <= 3) // not enough checkins
      					keep = false;
      				if (!venue.location || !venue.location.address) // no usable address
      					keep = false;
      				if ( nonPublicCategoryNames.indexOf(venue.categories[0].name) != -1 )
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

export const getHikingProjectTrails = (lat, lon, filterFn = (item)=>item ) => {
	return fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=75&maxResults=50&key=${hikingProjectKey}`)
	.then((response)=>{
		return response.json();
	})
	.then((json) => {
		if(json.trails){
			return json.trails.filter(filterFn);
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


const hikingIdeaBase = {
				title: "Some Hiking Meetup",
				howManyGroups: 8,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://secure.meetupstatic.com/photos/event/8/4/2/b/event_461013835.jpeg"
					},
				],
				description: "Description goes here.",
				agenda: [
					{ label: 'Gather at meeting point', minutes: 10},
				],
				where: {
					dataProvider: 'hikingproject',
					description: "Easy hikes",
					filterFn: (item) => {
						return item.difficulty == 'green'
					}
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
				],

				notFinished: false
			};


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
		getName: (city) => (`${city} Tech Meetup Group`),
		label: 'Tech',
		photo: 'https://secure.meetupstatic.com/photos/event/4/1/1/d/highres_463756669.jpeg',
		duotonePhoto: 'https://secure.meetupstatic.com/photos/event/4/1/2/9/highres_463756681.jpeg',
		ideas: [
			{
				title: "Lightning Demos",
				howManyGroups: 13,
				pastMeetups: [
					{
						title: "Side Project Lightning Demos",
						groupName: "Portland VR Meetup",
						attended: 90,
						photo: "http://i.imgur.com/BRP3Chp.jpg"
					},
					{
						title: "Demo Night - The Hackening",
						groupName: "NYC Side Project Club",
						attended: 96,
						photo: "https://secure.meetupstatic.com/photos/event/1/7/f/4/event_97806132.jpeg"
					},
					{
						title: "Lighning Demo Time",
						groupName: "Hack && Tell Berlin",
						attended: 90,
						photo: "https://secure.meetupstatic.com/photos/event/8/d/6/event_367922262.jpeg"
					},
					{
						title: "Hack & Tell #4 - Summer edition!",
						groupName: "London Hack&&Tell",
						attended: 53,
						photo: "https://secure.meetupstatic.com/photos/event/6/f/a/1/event_439528577.jpeg"
					},
				],
				description: "Like show & tell, but for hackers. Around 8–10 people give a five-minute presentation on something they built and then host a Q&A session for another five minutes. This isn't a time to share something from work or pitch a startup—it's about seeing what people do in their spare time for fun or utility.",
				agenda: [
					{ label: 'Introductions', minutes: 10},
					{ label: 'First set of hackers', minutes: 40},
					{ label: 'Bio break', minutes: 10},
					{ label: 'Second set of hackers', minutes: 40},
					{ label: 'Wrap up', minutes: 10},
				],
				where: {
					categoryId: `${foursquareCategories.coworkingSpace},${foursquareCategories.library},${foursquareCategories.communityCollege}`,
					description: "your office, library meeting rooms, coworking spaces, community colleges"
				},
				when: {
					options: [
						{day: 2, hour: 19},
						{day: 3, hour: 19},
						{day: 4, hour: 19},
					],
					description: "weeknights at 7pm"
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
						authorName: 'Emily',
						authorGroupName: 'Hack && Tell London',
						quote: "Have each presenter share links to their hacks in the comments before or after the event so everyone can tinker with them.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/8.jpg'
					},
					{
						authorName: 'Mark',
						authorGroupName: 'Hack && Tell New York',
						quote: "Ask a co-working space to host and sponsor your Meetup so you can accommodate more people.",
						authorPhoto: 'https://randomuser.me/api/portraits/men/8.jpg'
					},
					{
						authorName: 'Keith',
						authorGroupName: 'Hack && Tell Berlin',
						quote: "Food always keeps people happy. We suggest pizza because it's cheap and portable.",
						authorPhoto: 'https://randomuser.me/api/portraits/men/9.jpg'
					},
					{
						authorName: 'Natalia',
						authorGroupName: 'Hack && Tell DC',
						quote: "Check out the Hack && Tell Code of Conduct (http://hackandtell.org/) to avoid any issues during the Q&A.",
						authorPhoto: 'https://randomuser.me/api/portraits/women/9.jpg'
					},
				],

				notFinished: false
			},
			{
				title: "Side Project Workshop",
				howManyGroups: 17,
				pastMeetups: [
					{
						title: "Project Hack Night",
						groupName: "Portland VR Meetup",
						attended: 90,
						photo: "https://secure.meetupstatic.com/photos/event/9/a/b/6/event_449079606.jpeg"
					},
					{
						title: "Get it Done Workshop",
						groupName: "NYC Side Project Club",
						attended: 96,
						photo: "https://secure.meetupstatic.com/photos/event/1/7/f/4/event_97806132.jpeg"
					},
					{
						title: "Coders' Block",
						groupName: "Berlin iOS Side Projects",
						attended: 90,
						photo: "https://secure.meetupstatic.com/photos/event/8/d/6/event_367922262.jpeg"
					},
					{
						title: "Collaborative Work Session",
						groupName: "London JS Hackers",
						attended: 53,
						photo: "https://secure.meetupstatic.com/photos/event/6/f/a/1/event_439528577.jpeg"
					},
				],
				description: "Get your members together to tackle their side projects. It's not guaranteed that someone knows the exact answer to each problem that comes up, but trying to solve it together will help everyone learn. If you give the side project workshop a specific language or topic - it will help focus the Meetup and build momentum for your next one. Don't forget to make sure your venue has wifi!",
				agenda: [
					{ label: 'Introductions', minutes: 10},
					{ label: 'Pair working session', minutes: 20},
					{ label: 'Bio break', minutes: 10},
					{ label: 'Group Q&A', minutes: 20},
					{ label: 'Pair working session', minutes: 20},
					{ label: 'Wrap up', minutes: 10},
				],
				where: {
					categoryId: `,${foursquareCategories.coffee},${foursquareCategories.coworkingSpace},${foursquareCategories.library}`,
					description: "your office, coffee shops, library meeting rooms, coworking spaces"
				},
				when: {
					options: [
						{day: 2, hour: 19},
						{day: 3, hour: 19},
						{day: 4, hour: 19},
					],
					description: "weeknights at 7pm"
				},
				duration: {
					options: [
						"1 hour",
						"2 hours",
						"3 hours"
					],
					description: "2 hours"
				},

				notFinished: false
			},

			{
				title: "Hackathon",
				howManyGroups: 42,
				pastMeetups: [
					{
						title: "React Jam",
						groupName: "Portland JS Meetup",
						attended: 90,
						photo: "https://secure.meetupstatic.com/photos/event/b/9/6/0/event_460127456.jpeg"
					},
					{
						title: "Hackathon for Democracy",
						groupName: "DC Tech Meetup",
						attended: 96,
						photo: "https://secure.meetupstatic.com/photos/event/1/7/f/4/event_97806132.jpeg"
					},
					{
						title: "Ethereum Hackathon",
						groupName: "Berlin Cryptocurrency Meetup",
						attended: 90,
						photo: "https://secure.meetupstatic.com/photos/event/8/d/6/event_367922262.jpeg"
					},
					{
						title: "Augmented Reality Day",
						groupName: "London VR Club",
						attended: 53,
						photo: "https://secure.meetupstatic.com/photos/event/6/f/a/1/event_439528577.jpeg"
					},
				],
				description: "At a hackathon, people come together and use technology to transform ideas into reality. Take one day to form teams around a problem or theme and collaboratively design and code a solution from scratch. Whether your teams build a website, mobile app, or even hardware hack, the goal is end up with working prototypes that can be judged for a prize. Find out more about how to host one here: https://www.klipfolio.com/blog/run-hackathon",
				agenda: [
					{ label: 'Introductions', minutes: 20},
					{ label: 'Present the problem or theme', minutes: 20},
					{ label: 'Team formation', minutes: 10},
					{ label: 'Hacking block'},
					{ label: 'Break', minutes: 30},
					{ label: 'Hacking block'},
					{ label: 'Demos', minutes: 60},
				],
				where: {
					categoryId: `${foursquareCategories.coworkingSpace},${foursquareCategories.library}`,
					description: "your office, library meeting rooms, coworking spaces"
				},
				when: {
					options: [
						{day: 6, hour: 10},
						{day: 0, hour: 10}
					],
					description: "weekends at 10am"
				},
				duration: {
					options: [
						"4 hours",
						"6 hours",
						"8 hours"
					],
					description: "6 hours"
				},

				notFinished: false
			},
			{
				title: "Peer Review Lab",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://secure.meetupstatic.com/photos/event/e/0/e/8/event_455037576.jpeg"
					},
				],
				notFinished: true
			},
			{
				title: "Lean Coffee",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://secure.meetupstatic.com/photos/event/6/e/e/0/event_460888384.jpeg"
					},
				],
				notFinished: true
			},


			{
				title: "Group Discussion",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://a248.e.akamai.net/secure.meetupstatic.com/photos/event/8/0/f/1/event_455193009.jpeg"
					},
				],
				notFinished: true
			},
			{
				title: "Game Night",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://a248.e.akamai.net/secure.meetupstatic.com/photos/event/d/8/c/event_448863468.jpeg"
					},
				],
				notFinished: true
			},
			{
				title: "Workshop",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://secure.meetupstatic.com/photos/event/9/a/b/6/event_449079606.jpeg"
					},
				],
				notFinished: true
			},
			{
				title: "Hack for Purpose",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "http://i.imgur.com/gWNraUUm.jpg"
					},
				],
				notFinished: true
			},
			{
				title: "Social Hangout",
				howManyGroups: 8,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://secure.meetupstatic.com/photos/event/3/7/d/f/highres_463034303.jpeg"
					},
				],
				notFinished: true
			},
			{
				title: "Hear From an Expert",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://cdn-images-1.medium.com/max/800/0*S8x912Fk4_qXFYNT."
					},
				],
				notFinished: true
			},

			{
				title: "Welcome Drinks",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "http://photos1.meetupstatic.com/photos/event/2/3/4/e/event_444129038.jpeg"
					},
				],
				notFinished: true
			},
			{
				title: "Networking",
				howManyGroups: 27,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "http://i.imgur.com/apF1wCsm.jpg"
					},
				],
				notFinished: true
			},

		],
		notFinished: false
	},


	// HIKING

	hiking: {
		getName: (city) => (`${city} Hikers Meetup Group`),
		label: 'Hiking',
		photo: 'https://secure.meetupstatic.com/photos/event/4/4/d/d/highres_463757629.jpeg',
		duotonePhoto: 'https://secure.meetupstatic.com/photos/event/4/5/0/0/highres_463757664.jpeg',
		ideas: [
			Object.assign({}, hikingIdeaBase, {
				title: "Beginner Level Hike",
				where: {
					dataProvider: 'hikingproject',
					description: "Beginner hikes",
					filterFn: (item) => {
						return item.difficulty == 'green' || item.difficulty == 'greenBlue'
					}
				},
			}),
			Object.assign({}, hikingIdeaBase, {
				title: "Medium Level Hike",
				where: {
					dataProvider: 'hikingproject',
					description: "Medium hikes",
					filterFn: (item) => {
						return item.difficulty == 'blue'
					}
				},
			}),
			Object.assign({}, hikingIdeaBase, {
				title: "Advanced Level Hike",
				where: {
					dataProvider: 'hikingproject',
					description: "Advanced hikes",
					filterFn: (item) => {
						return item.difficulty == 'black' || item.difficulty == 'blueBlack'
					}
				},
			}),
			{
				title: "Some Other Hiking Idea",
				howManyGroups: 8,
				pastMeetups: [
					{
						title: "Dummy Event",
						groupName: "Dummy Group",
						attended: 0,
						photo: "https://secure.meetupstatic.com/photos/event/8/4/2/b/event_461013835.jpeg"
					},
				],
				notFinished: true
			},
		],
		notFinished: true
	}
}



export const store = {
	newEvent: {}
};
