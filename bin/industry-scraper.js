const http = require('http')
const  cheerio  = require('cheerio')
const  request  = require('request')
const  path     = require('path')
const  address  = 'http://community.data.com/t5/Ask-the-Experts/Complete-List-of-Industries/td-p/100250'
const  app        = require(path.resolve(__dirname, '../server/server'))
const  db         = app.dataSources.db
const  Industry    = app.models.Industry
let   industries    = [] 

request.get({uri: address}, (err, res, body) => {
	if (err) throw err;
	const $c = cheerio.load(body)
	
	$c('#messagebodydisplay_0 > div:nth-child(1) p').each(function(i, elem) {
		if ($c(this).text().length > 1) {
			let name = $c(this).text();
			let depth = 1;
			industries.push( {name: name, depth: depth } )
		}
	})

	console.log('%s industries were collected', industries.length)

	for (let i = 0; i < industries.length; i++) {
		Industry.findOrCreate(industries[i], (err, obj) => {
			if (err) throw err;
			console.log(' instance of Industry was created: %s', obj.instance)
		})

	}
})


	






