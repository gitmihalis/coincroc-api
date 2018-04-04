'use strict';

module.exports = function(Cryptocurrency) {
	/**
	 * Fetches coinlist from the CryptoCompare API.
	 * @param {Function(Error, object)} callback
	 * returns a json object to work with
	 */
	Cryptocurrency.scanCryptos = function(callback) {

		var https = require('https');
		var url = require('url');
		var body = '';
	    var options = url.parse('https://min-api.cryptocompare.com/data/all/coinlist');

	  // Fetch a list of cryptos from the cryptocompare API
		https.get(options, function(res) {

		  console.log('statusCode:', res.statusCode);
		  console.log('headers:', res.headers);
		  res.on('data', function(chunk) {
		  	body += chunk;
		  });
		  res.on('err', function(err) {
		  	callback(err, json)
		  })
		  res.on('end', function(res) {
		  	var cryptocompareResponse = body;
		  	callback(null, cryptocompareResponse);
		  });
		});
	}

	Cryptocurrency.afterRemote('scanCryptos', function(ctx, finalOut, next) {
		var cryptocurrencies = JSON.parse(finalOut.cryptocompareResponse).Data;

		for(var key in cryptocurrencies) {
			var symbol = cryptocurrencies[key].Symbol;
			var name = cryptocurrencies[key].CoinName;
			var newCrypto = { symbol, name }

			Cryptocurrency.findOrCreate(
				{ where: 
					{ symbol: symbol }
				}, 
				newCrypto,
				function(err, instance, created) {
					if (err) return console.log(err);
					return console.log(instance);
				}
			); 

		}
	
		// console.log(result);
		next();
	})	
};
