const Nightmare = require('nightmare')
const async = require('async')
const path = require('path')
const app = require(path.resolve(__dirname, '../server/server'))
const db = app.dataSources.db	
const Cryptocurrency = app.models.Cryptocurrency

/* Query the DS for crytpocurrencies to use for the API requests
	<!> there was a bug when commiting 2600+ files to memory so for now
	we paginate the results of the find method and save in smaller 
	batches </!> */
const cryptos = Cryptocurrency.find({
		order: 'symbol DESC', 
		limit: 25,
		skip: 50 // last time scrape ran, skip was `50`		
	}, function(err, collection) {
	if (err) throw err;

	const series = collection.reduce(async (queue, item) => {
		const data = await queue
		/* If the symbol contains an asterisk, cryptocompare will not find the page overview
		 so we can disregard it and save the scaper 404 timeouts */
		if (!item.symbol.match(/\*/)) data.push(await fetchDescription(item.symbol))
		return data
	}, Promise.resolve([]))

	series.then(newData => {
		/* data is an array of symbol/descirption keyval pairs 
		{ symbol: 'ETH', description: 'Ethereum */

		// iterate and save each keyval pair in the series
		async.each(newData, function(d) {
			updateCryptocurrency(
				{symbol: d.symbol},
				{fullDesc: d.description}
			)
		}, function(err) {
			console.log(err)
		})

		db.disconnect()
		return console.log('done')
	})
	.catch(err => console.log('error saving new Data ', err))
})

/* TODO inquire into why JS doesn't wait for previous the previous promise to resolve when 
 the `then` funcition doesn't wrap it's content in a function */
async function fetchDescription(symbol) {
	console.log(`Now fetching description for ${symbol}`)
	const nightmare = Nightmare({ show: true })

	try {
		symbol = String(symbol).toUpperCase()
		const result = await nightmare
	  	.goto(`https://www.cryptocompare.com/coins/${symbol}/overview`)
	  	.wait('.coin-description')
	  	.evaluate(() => {
	  		return (
	  			[...document.querySelectorAll('.coin-description p')]
	  				.map(el => el.innerText).join(' ')
	  		)
			})
			.end();
		return { symbol: symbol, description: result }
	} catch (err) {
		console.log(err)
		return undefined
	}
}

function updateCryptocurrency(whereCondition, newData ) {
	Cryptocurrency.updateAll(whereCondition, newData, function(err, instance) {
		if (err) throw err;

		console.log('instance of Cryptocurrency was created: %s', JSON.stringify(instance))
		return instance
	})
}	





