'use strict';

const  cheerio  = require('cheerio')
const  request  = require('request')
const  path     = require('path')
const  address  = 'http://www.investorguide.com/industry-list.php'
const  app        = require(path.resolve(__dirname, '../server/server'))
const  db         = app.dataSources.db
const  Industry    = app.models.Industry
let   industries    = []

request.get({uri: address}, (err, res, body) => {
	if (err) throw err;
	const $c = cheerio.load(body)

	$c('.row.container.td-100.list-item').each(function(i, elem) {
    if (!elem) return
		if ($c(this).text().length > 1) {
      let name = $c(this).text();
      name = name.replace('\n', '')
      let depth = 1;
      industries.push( {name: name, depth: depth } )
      console.log(`added ${name} to industry queue`)
		}
	})

	console.log('%s industries were collected', industries.length)
  if (industries.length === 0) return
	for (let i = 0; i < industries.length; i++) {
		Industry.findOrCreate(industries[i], (err, instance, created) => {
			if (err) throw err;
			console.log(`${instance.name} Industry was created`)
		})
  }
})
