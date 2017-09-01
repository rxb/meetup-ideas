require('import-export');
const {
	data
} = require('./data.js');

const ideas = data.tech.ideas;

ideas.forEach((idea)=>{
	console.log(idea.title);
	console.log(idea.pastMeetups[0].photo.replace(/(event_)/, 'highres_'));
	console.log('\n');
});