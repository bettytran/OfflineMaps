var map = L.map('map');
map.setView([25.271139, 55.307485], 14);
//we can set this to current location instead.

L.tileLayer('lib/{z}/{x}/{y}.png', {
		attribution : '',
		maxZoom : 16,
		minZoom : 14,
		reuseTiles : true,
		unloadInvisibleTiles : true
	}).addTo(map);



/*
 * uncomment this function and comment out the above L.tileLayer() to use the downloaded map tiles.
 */
/*
//this function is required to obtain the path to the application data directory to where the map tiles are downloaded.
var showMap = function(e) {
	L.tileLayer(e.path + '/{z}/{x}/{y}.png', {
		attribution : '',
		maxZoom : 16,
		minZoom : 14,
		reuseTiles : true,
		unloadInvisibleTiles : true
	}).addTo(map);
}

Ti.App.addEventListener('map:showMap', showMap);
*/



/*
 * Use for getting curent location and displaying on the map.
 */
/*
 map.locate({setView: false, maxZoom: 16});

 function onLocationFound(e) {
 var radius = e.accuracy / 2;

 L.marker(e.latlng).addTo(map)
 .bindPopup("You are within " + radius + " meters from this point").openPopup();
 }

 map.on('locationfound', onLocationFound);
 */

var showMarker = function(e) {
	map.setView([e.lat, e.lon], 14);
	var marker = L.marker([e.lat, e.lon]).addTo(map);

	marker.bindPopup(e.title).openPopup();

	Ti.App.removeEventListener('map:showMarker', showMarker);
}

Ti.App.addEventListener('map:showMarker', showMarker);

/*
 * This is for restricting the map panning area
 */
/*
 Ti.App.addEventListener('map:setBounds', function(e){
 var sw = new L.LatLng(25.071979,55.118752),
 ne = new L.LatLng(25.334159,55.453148),
 bounds = new L.LatLngBounds(sw, ne);

 map.setMaxBounds(bounds);

 });
 */