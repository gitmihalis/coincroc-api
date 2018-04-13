const phantom 		= require('phantom')
const cheerio  		= require('cheerio')
const path 				= require('path')
// const app         = require(path.resolve(__dirname, '../server/server'))
// const db          = app.dataSources.db
// const Cryptocurrency    = app.models.Cryptocurrency

const fetchOverview = async (tokenSymbol) => {
	try {
		const res = {}

	  const instance = await phantom.create();
	  const page = await instance.createPage();
	  const status = await page.open(`https://www.cryptocompare.com/coins/${tokenSymbol}/overview/USD`)
	  console.log(status);
	  const content = await page.property('content');
	  instance.exit()
	  return content
	} catch ( err ) {
		console.log(err)
	}
}

const updateDescription = async (content, tokenSymbol) => {

	try {
		const $c = cheerio.load(content)
		console.log(content)
		const fullDescription = await $c('.coin-description > p').text()
		// for (let i = 0; i < cryptos.length; i++) {
		// 	Cryptocurrency.updateAttribute('fullDesc', cryptos[i].desc, (err, obj) => {
		// 		if (err) throw err;
		// 		console.log(' instance of Cryptocurrency was updated: %s', obj.instance)
		// 	})
		return console.log( 'fullDescription: ', fullDescription	)


	} catch (err) {
		console.log(err)
	}
}

fetchOverview('eth')
	.then( res => {
		updateDescription(res)
	})
	.then(_ => {
		process.exit()
	})






// Description lives at div.coin-description > p 