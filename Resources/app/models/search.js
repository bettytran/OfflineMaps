var prox = require('lib/proximity');

function searchModel() {
	
	this.data = null;
	
	this.storeSearch = function() {

		// Hardcoded to point to somewhere in dubai for now
		var bounds = prox.calculateBounds({
			lat : 25.271139,
			lon : 55.307485
		}, 3000);

		// Query the database for stores within the 3km bounding square to the current position.
		 
		var db = Ti.Database.install("/db/map.sqlite", "location");
		
		var rows = db.execute("select * from mapview where (lat >= ? and lat <= ?) and (long >= ? and long <= ?)", bounds.minLat, bounds.maxLat, bounds.minLon, bounds.maxLon);
		
		var totalRows = rows.getRowCount();
		
		var data = [];

		for (var i = 0; i < totalRows; i++) {
			var lat = rows.fieldByName("lat"), lon = rows.fieldByName("long");
			var count = i;
			data[i] = {
				title : rows.fieldByName("address"),
				lat : lat,
				lon : lon,
				proximity : prox.getProximity({
					lat : 25.271139, //e.coords.latitude,
					lon : 55.307485 //e.coords.longitude
				}, {
					lat : lat,
					lon : lon
				}, 'km')
			};

			rows.next();
		}

		rows.close();
		db.close();

		data = data.sort(function(a, b) {
			a = a.proximity;
			b = b.proximity;
			return ((a < b) ? -1 : ((a > b) ? 1 : 0));
		});
		
		this.data = data;
		
		return data;
	}
}

module.exports = searchModel; 