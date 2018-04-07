'use strict';

module.exports = function(Industry) {

	// function updateOtherCollection(collectionName, newData){
	// 	var app = require('../../server/server');
	// 	var db = app.dataSources.db;
	// 	var collection = db.connector.collection(collectionName);		

	// 	collection.update(
	// 		{name: "Bitcoin"},
	// 		{$set: { "industries.$.name": newData.name } },
	// 		{multi: true},
	// 		 { arrayFilters: [ {"industries.$": {name: "Open-source"} } ]},
	// 		 function(err) { 
	// 		 	if (err){
	// 		 		return console.log(err);
	// 		 	}
	// 			console.log('updated other collections')	
	// 		}
	// 	)
	// }

	Industry.observe('after save', function(ctx, next) {
		if ((ctx.isNewInstance === undefined )) {
			// Need to update some other collections
			console.log('You need to update other collections')
			// updateOtherCollection('Cryptocurrency', ctx.data)
		}	
		next()
	})

};
