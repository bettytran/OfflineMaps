var earth = 6371; //mean radius of earth

var proximity = {
	getCurrentLoc : function(callback) {

		Ti.Geolocation.purpose = "";
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.success || e.error) {
				alert('error ' + JSON.stringify(e.error));
				return;
			}

			callback(e);

		});

	},
	deg2rad: function(deg){
		return deg * Math.PI/180;
	},
	rad2deg: function(rad){
		return rad * 180/Math.PI;
	},
	calculateBounds: function(loc,r){
		
		//convert to rad
		var lat = this.deg2rad(loc.lat);
		
		var latR = (r / 40075017) * 360; //circumference of earth
		var lonR = latR / Math.cos(lat);
		
		return {
			latMin: loc.lat - latR,
			latMax: loc.lat + latR,
			lonMin: loc.lon - lonR,
			lonMax: loc.lon + lonR
		}

		/*
		 //alternative calculation 
		 
		var distance = 3; //distance of bounding box
		var r = distance/earth;
		
		//latitude bounds
		var latMin = lat - r; 
		var latMax = lat + r;
		
		//longitude bounds
		
		//arcsin(sin(r)/cos(lat)) 
		var lonDelta = Math.asin(Math.sin(r)/Math.cos(lat));
		
		var lonMin = lon - lonDelta;
		var lonMax = lon + lonDelta;
		
		return {
			latMin: latMin,
			latMax: latMax,
			lonMin: lonMin,
			lonMax: lonMax
		}
		*/
	},
	getProximity : function(loc, dest, unit) {
		Ti.API.info(loc.lat + ' ' + loc.lon);
		
		//convert to radians
		var lat1 = this.deg2rad(loc.lat);
		var lon1 = this.deg2rad(loc.lon);
		
		var lat2 = this.deg2rad(dest.lat);
		var lon2 = this.deg2rad(dest.lon);
		
		// Spherical Law of Cosines for distance acos(sin(lat1).sin(lat2)+cos(lat1).cos(lat2).cos(long2−long1)).R
		var d = (Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2-lon1)))*earth;
		
		var result = null;

		switch(unit) {
			case 'km':
				result = d;
				break;
			case 'miles':
				var mile = d / 1.6;
				mile = Math.round(mile * 100) / 100;
				result = mile;
				break;
		}
		return result;
	}
};

module.exports = proximity;
