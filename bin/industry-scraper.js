const http = require('http'),
  cheerio  = require('cheerio'),
  request  = require('request'),
  path     = require('path'),
  address  = 'http://community.data.com/t5/Ask-the-Experts/Complete-List-of-Industries/td-p/100250',
  app        = require(path.resolve(__dirname, '../server/server')),
  db         = app.dataSources.db,
  Industry    = app.models.Industry;
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


	






