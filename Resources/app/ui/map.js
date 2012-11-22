function map() {
	var self = this;

	this.UI = Ti.UI.createWindow({
		backgroundColor : '#fff',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});

	this.mapType = 'online';
	this.mapView = null;

	this.initOnline = function() {
		self.mapView = Titanium.Map.createView({
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 25.271139,
				longitude : 55.307485,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			},
			animate : true,
			regionFit : true,
			userLocation : true,
		});

		var button = Ti.UI.createButton({
			top : 10,
			right : 10,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			title : 'close',
			zIndex : 10
		});

		self.UI.add(button);

		button.addEventListener('click', function(e) {
			self.UI.close()
		});

		self.UI.add(self.mapView);

	}

	this.initOffline = function() {
		self.mapType = 'offline';

		self.mapView = Ti.UI.createWebView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			backgroundColor : '#fff',
			zIndex : 10,
			url : '/map/map.html'
		});

		self.UI.add(self.mapView);

		var button = Ti.UI.createButton({
			top : 10,
			right : 10,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			title : 'close',
			zIndex : 10
		});

		self.UI.add(button);

		button.addEventListener('click', function(e) {
			self.UI.close()
		});
		
		//For passing the data directory path to the webview in order to use the downloaded tiles.
		setTimeout(function() {
				Ti.App.fireEvent('map:showMap', {path: Ti.Filesystem.applicationDataDirectory + 'map'});
			}, 500);
	}

	this.setMarker = function(data) {
		if (self.mapType == 'offline') {
			Ti.App.fireEvent('map:showMarker', data);
		} else {
			var marker = Ti.Map.createAnnotation({
				latitude : data.lat,
				longitude : data.lon,
				title : data.title,
				pincolor : Titanium.Map.ANNOTATION_RED,
				animate : true
			});

			self.mapView.annotations = [marker];
			self.mapView.region = {
				latitude : data.lat,
				longitude : data.lon,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			}
		}
	};
	
	this.init = function(){
		if(Ti.Network.getOnline() == true){
			self.initOnline();
		} else {
			self.initOffline();
		}
	}

	self.init();
}

module.exports = map;
