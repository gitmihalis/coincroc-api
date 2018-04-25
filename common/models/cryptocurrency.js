'use strict';

module.exports = function(Cryptocurrency) {
  /*
   * Fetches coinlist from the CryptoCompare API.
   * @param {Function(Error, object)} callback
   * returns a json object to work with
   */
  Cryptocurrency.scrapeCrypto = function(callback) {
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
        callback(err, body);
      });
      res.on('end', function(res) {
        var cryptocompareResponse = body;
        callback(null, cryptocompareResponse);
      });
    });
  };

  Cryptocurrency.afterRemote('scrapeCrypto', function(ctx, finalOut, next) {
    var cryptocurrencies = JSON.parse(finalOut.cryptocompareResponse).Data;
    var batch = [];
    for (var key in cryptocurrencies) {
      var symbol = cryptocurrencies[key].Symbol;
      var name = cryptocurrencies[key].CoinName;
      var image = cryptocurrencies[key].ImageUrl;
      var newCrypto = {symbol, name, image};
      batch.push(newCrypto);
    };

    for (var i = 0; i < batch.length; i++) {
      setTimeout(function(x) {
        return function() {
          Cryptocurrency.findOrCreate(
            {where:
              {symbol: batch[x].symbol},
            },
            batch[x],
            function(err, instance, created) {
              if (err) return console.log(err);
              console.log(instance);
              console.log(created);
            }
          );
        };
      }(i), i * 100);
    }
  });
};
