'use strict';

module.exports = function(Industry) {

	// function updateOtherCollection(collectionName, whereCondition, newData){
	// 	var app = require('../../server/server');
	// 	var db = app.dataSources.db;
	// 	var collection = db.connector.collection(collectionName);		

	// 	collection.update(
	// 		whereCondition,
	// 		{ $set: newData },
	// 		{ multi: true }
	// 	)
	// }

	// Industry.observe('after save', function(ctx, next) {
	// 	if ((ctx.isNewInstance === undefined ) && (ctx.info.count > 0)) {
	// 		// Need to update some other collections
	// 		var where = ctx.where
	// 		var data = ctx.data		
	// 		updateOtherCollection('Cryptocurrency', where, data)
	// 		console.log('updated other collections')	
	// 	}	

	// 	next()
	// })

};
