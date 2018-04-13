const phantom 				= require('phantom')
const cheerio  				= require('cheerio')
const path 						= require('path')
const app         		= require(path.resolve(__dirname, '../server/server'))
const db          		= app.dataSources.db
const Cryptocurrency  = app.models.Cryptocurrency

const fetchOverview = async (tokenSymbol) => {
	try {
		const res = {}
	  const instance = await phantom.create();
	  const page = await instance.createPage();
	  const status = await page.open(`https://www.cryptocompare.com/coins/${tokenSymbol}/overview`)
	  console.log('request status: ', status);

	  const content = await page.property('content');
	  const symbol = tokenSymbol.toUpperCase()
	  instance.exit()

		const $c = cheerio.load(content); console.log('cheerio loaded page ? %s', (!!content))
		const description = await $c('.coin-description > p').text()

		const save = Cryptocurrency.updateAll(
			{ symbol: symbol }, 
			{ fullDesc: description }, 
			function(err, info) {
    		if (err) console.log(err);
    		console.log('cryptocurrency was updated: ', info)
			}
		)

	} catch ( err ) {
		console.log(err)
	}
}


fetchOverview('eth')
	.then( res => {
		db.disconnect()
	})
	.catch(err => { throw err })






// Description lives at div.coin-description > p 