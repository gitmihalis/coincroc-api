const Nightmare = require('nightmare')
const async = require('async')
const path = require('path')
const app = require(path.resolve(__dirname, '../server/server'))
const db = app.dataSources.db	
const Cryptocurrency = app.models.Cryptocurrency

const cryptos = Cryptocurrency.find({limit: 5}, function(err, collection) {
	if (err) throw err;

	const series = collection.reduce(async (queue, item) => {
		const data = await queue
		data.push(await fetchDescription(item.symbol))
		return data
	}, Promise.resolve([]))

	series.then(data => {
		/* data is an array of symbol/descirption keyval pairs 
		{ symbol: 'ETH', description: 'Ethereum */

		// iterate and save each keyval pair in the series
		data.forEach(function(d) {
			updateCryptocurrency(
				{symbol: d.symbol},
				{fullDesc: d.description}
			)
		})
	})
	.catch(err => console.log('error saving crypto ', err))
})



/* TODO inquire into why JS doesn't wait for previous the previous promise to resolve when 
 the `then` funcition doesn't wrap it's content in a function */

async function fetchDescription(symbol) {
	console.log(`Now fetching description for ${symbol}`)
	const nightmare = Nightmare({ show: true })

	try {
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
		console.log('$Description <string>:', result)
		return { symbol, description: result }
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




	// AFTER END
	//   	.then( cryptoDescription => {
	//   		cryptoDescriptions.push({symbol: tokenSymbol, desc: cryptoDescription})
	//   		return cryptoDescription
	//   	})
	//   	.then((cryptoDescription) => {
	//   		let symbol = tokenSymbol.toUpperCase()
	//   		updateCryptocurrency({symbol: symbol}, {fullDesc: cryptoDescription }) 
	//   	})
	//   	.then(() => db.disconnect())
	//   	.catch(err => {
	//   })			





