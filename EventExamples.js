
const csv = require('csvtojson');
const express = require('express')
const exphbs  = require('express-handlebars');

// express config
const app = express();

const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
		testhelper: function(){
			return 'test test'
		}
    },
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// routes
app.get('/', function (req, res) {

	const csvFilePath='./examples.csv';
	csv()
		.fromFile(csvFilePath)
		.on('end_parsed',(jsonArrObj)=>{
			res.render('examples', {examples: jsonArrObj});
		});
});

// go
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})