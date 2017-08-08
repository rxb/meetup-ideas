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

	// minneapolis
    const lat = 44.9;
    const lon = -93.2;

    // new hampshire
	// const lat = 42.88;
	// const lon = -71.32;

	// clewiston
	// const lat = 26.75;
	// const lon = -80.93;

	// los angeles
	// const lat = 34.05;
	// const lon = -118.24;

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


const parentPastMeetup = {
	title: "Weekly Kids Meetup",
	groupName: "Miami Cool Parents",
	attended: 21,
	photo: "https://secure.meetupstatic.com/photos/event/d/c/a/a/event_460916490.jpeg"
};



export const data = {



	// ******************
	// parenting

	/*


	2. Picnic
	3. Park playdate
	4. Potluck
	5. Farm field trip
	6. Nature Walk
	7. Science Field Trip
	8. Craft Making
	9. Storytime
	10. Kids Movie Party
	1. Moms dinner
	*/


	parenting: {
		name: 'Minneapolis Parents Collective',
		label: 'Parenting',
		photo: 'https://secure.meetupstatic.com/s/img/explore_page_photos/find-4.jpg',
		ideas: [
			{
				title: "Ice Cream Party",
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
					{ label: 'Setup', minutes: 15},
					{ label: 'Meet and greet', minutes: 5},
					{ label: 'Ice cream time', minutes: 30},
					{ label: 'Kids games', minutes: 30},
					{ label: 'Clean up', minutes: 15},
				],
				where: {
					categoryId: `${foursquareCategories.park},${foursquareCategories.playground}`,
					description: "Parks, Playgrounds, Backyards"
				},
				when: {
					options: [
						{day: 6, hour: 15},
						{day: 1, hour: 15},
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
				}
			},
			{
				title: "Park Playdate",
				howManyGroups: 87,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "http://photos1.meetupstatic.com/photos/event/8/a/c/a/event_458135530.jpeg"
				},
				],
				notFinished: true
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
				title: "Farm Field Trip",
				howManyGroups: 19,
				pastMeetups: [
				{
					title: "Dummy Event",
					groupName: "Dummy Group",
					attended: 0,
					photo: "https://a248.e.akamai.net/secure.meetupstatic.com/photos/event/d/a/9/event_458575960.jpeg"
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