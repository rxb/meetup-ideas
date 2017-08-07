import moment from 'moment';

const foursquareClientId = 'Y1Y51NDFA2GCSXJB00OMXN2QBGGL4ASQLW1OM42BM54KZOKV';
const foursquareClientSecret = 'XHARYWMWQQAHMUFT2UBJYPHFD3DVP44FCK2TWLEQX1F3BXVK';

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
	dogs: '4bf58dd8d48988d1e5941735'
}

export const store = {
	newEvent: {}
};


export const getFoursquareVenue = (venueId = '40a55d80f964a52020f31ee3') => {

    return fetch(`https://api.foursquare.com/v2/venues/${venueId}?&client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20170801`)
      	.then((response) => response.json());
};

export const getFoursquareVenues = (categoryId) => {

    const lat = 44.9;
    const lon = -93.2;

    return fetch(`https://api.foursquare.com/v2/venues/search?intent=browse&radius=8000&ll=${lat},${lon}&categoryId=${categoryId}&client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&v=20170801&limit=8`)
      	.then((response) => response.json());
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

const parentIdeaBase = {
	title: "Let's go to the beach",
	description: "At at a beach Meetup, parents bring clothes their kids have outgrown or no longer need to trade with other parents. It’s fun and free way to put those old clothes to good use.",
	howManyGroups: 43,
	pastMeetups: [
		{
			title: "Let's go to that beach",
			groupName: "Los Angeles Dads",
			attended: 21,
			photo: "https://secure.meetupstatic.com/photos/event/d/c/a/a/event_460916490.jpeg"
		},

		{
			title: "Let's go to this beach",
			groupName: "Boston Dads",
			attended: 23,
			photo: "https://secure.meetupstatic.com/photos/event/8/5/a/1/event_462754209.jpeg"
		},

	],
	agenda: [
		{ label: 'Arrivals', minutes: 5},
		{ label: 'Introductions', minutes: 10},
		{ label: 'Storytime', minutes: 30},
		{ label: 'Snacks', minutes: 30},
		{ label: 'Goodbyes', minutes: 10},
	],
	where: {
		categoryId: `${foursquareCategories.coffee},${foursquareCategories.library}`,
		description: "Library meeting rooms, Coffee shops"
	},
	when: {
		options: [
			{day: 2, hour: 10},
			{day: 4, hour: 10},
			{day: 6, hour: 15},
		],
		description: "weekdays around 10:00am"
	},
	duration: {
		options: [
			"1 hour",
			"2 hours",
			"3 hours"
		],
		description: "2 hours"
	}
};

const parentPastMeetup = {
	title: "Weekly Kids Meetup",
	groupName: "Miami Cool Parents",
	attended: 21,
	photo: "https://secure.meetupstatic.com/photos/event/d/c/a/a/event_460916490.jpeg"
};

const hikingIdeaBase = {
	title: "Let's go to the beach",
	description: "This is a placeholder description. Parents bring clothes their kids have outgrown or no longer need to trade with other parents. It’s fun and free way to put those old clothes to good use.",
	howManyGroups: 43,
	pastMeetups: [
		{
			title: "Let's go to this beach",
			groupName: "Boston Dads",
			attended: 23,
			photo: "https://secure.meetupstatic.com/photos/event/8/5/a/1/event_462754209.jpeg"
		},
		{
			title: "Weekly Kids Meetup",
			groupName: "Miami Cool Parents",
			attended: 21,
			photo: "https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg"
		},
	],
	agenda: [
		{ label: 'Meet at starting point', minutes: 10},
		{ label: 'Hike to top', minutes: 60},
		{ label: 'Snack break', minutes: 15},
		{ label: 'Hike back down', minutes: 60},
		{ label: 'Wrap up', minutes: 5},
	],
	where: {
		categoryId: `${foursquareCategories.trail}`,
		description: "Hiking trails, Parks"
	},
	when: {
		options: [
			{day: 2, hour: 10},
			{day: 4, hour: 10},
			{day: 6, hour: 15},
		],
		description: "weekdays around 10:00am"
	},
	duration: {
		options: [
			"1 hour",
			"2 hours",
			"3 hours"
		],
		description: "2 hours"
	}
}


export const data = {



	// ******************
	// parenting
	parenting: {
		name: 'Minneapolis Parents Collective',
		label: 'Parenting',
		photo: 'https://secure.meetupstatic.com/s/img/explore_page_photos/find-4.jpg',
		ideas: [
			{
				...parentIdeaBase,
				title: "Storytime at the Library",
				pastMeetups: [
					{
						title: "Afternoon Library Stories",
						groupName: "Boise Moms Meetup",
						attended: 23,
						photo: "https://secure.meetupstatic.com/photos/event/8/2/3/1/event_459753329.jpeg"
					},
					parentPastMeetup,
					parentPastMeetup,
				],
				where: {
					categoryId: `${foursquareCategories.library}`,
					description: "Libraries"
				},
			},
			{
				...parentIdeaBase,
				title: "Playdate",
				pastMeetups: [
					{
						title: "Playdate at the Park",
						groupName: "Los Angeles Dads",
						attended: 23,
						photo: "https://secure.meetupstatic.com/photos/event/9/6/9/3/event_448058547.jpeg"
					},
					parentPastMeetup,
					parentPastMeetup,
				]
			},
			{
				...parentIdeaBase,
				title: "Kids Clothing Exchange"
			},

			{
				...parentIdeaBase,
				title: "Fire Station Field Trip",
				where: {
					categoryId: `${foursquareCategories.fire}`,
					description: "Fire stations"
				},
			},
			{
				...parentIdeaBase,
				title: "Baking Cookies & Cookie Decorating"
			},
			{
				...parentIdeaBase,
				title: "Beach Day",
				where: {
					categoryId: `${foursquareCategories.beach}`,
					description: "Beaches"
				},
			},

			{
				...parentIdeaBase,
				title: "Ice Cream Social"
			},
			{
				...parentIdeaBase,
				title: "Picnic"
			},
			{
				...parentIdeaBase,
				title: "Kids' Gym Field Trip"
			},
			{
				...parentIdeaBase,
				title: "Moms-Only Coffee Date"
			},

		]
	},


	/*

	// ******************
	// hiking
	hiking: {
		name: 'South Minneapolis Hikers Meetu Group',
		label: 'Hiking',
		photo: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg',
		ideas: [
			{
				...hikingIdeaBase,
				title: "Beginner hike"
			},
		]
	},

	hiking: {
		name: 'South Minneapolis Hikers Meetu Group',
		label: 'Hiking',
		photo: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg',
		ideas: [
			{
				...hikingIdeaBase,
				title: "Beginner hike"
			},
		]
	},

	*/

}