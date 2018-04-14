const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const path = require('path')
const app = require(path.resolve(__dirname, '../server/server'))
const db = app.dataSources.db	
const Cryptocurrency = app.models.Cryptocurrency

const tokenDescriptions = {}
var currCryptoSym = 'xrp'

nightmare
  .goto('https://www.cryptocompare.com/coins/'+currCryptoSym+'/overview')
  .wait('.coin-description')
  .evaluate(() => {
  	return new Promise((resolve, reject) => {
  		resolve(document.querySelector('.coin-description p').innerText)
  	})
	})
  .end()
  .then( tokenDescription => {
  	tokenDescriptions[currCryptoSym] = tokenDescription
  	console.log(tokenDescriptions[currCryptoSym])
  })
  /* TODO inquire into why JS doesn't wait for previous the previous promise to resolve when 
   the `then` funcition doesn't wrap it's content in a function */
  .then(() => {
  	let symbol = currCryptoSym.toUpperCase()
  	updateCryptocurrency({symbol: symbol}, {fullDesc: tokenDescriptions[currCryptoSym] }) 
  })
  .then(() => db.disconnect())
  .catch(error => {
    console.error('Search failed:', error)
  })

function updateCryptocurrency(whereCondition, newData ) {
	// var app = require(path.resolve(__dirname, '../server/server'))
	// var db = app.dataSources.db	
	// var collection = db.connector.collection(collectionName);
	Cryptocurrency.updateAll(whereCondition, newData, function(err, instance) {
		if (err) throw err;
		console.log('instance of Cryptocurrency was created: %s', JSON.stringify(instance))
		return instance
	})
}

function fetchAllOf(model, tokenSymbol) {
}

  // generate max fathers
// async.times(max, function(n, next_father){
//   var father = ...
//   father.save(function(err){
//     // generate 12 sons
//     async.times(12, function(m, next_son){
//       var son = ...
//       son.save(function(err){
//         next_son(err);
//       });
//     }, function(err, sons){
//       next_father(err);
//     });
//   });
// }, function(err, fathers) {
//   // it's done
// });


