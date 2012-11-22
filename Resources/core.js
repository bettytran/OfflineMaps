var searchController = require('app/ui/search');

var APP = {
	init : function() {

		var search = new searchController();
		search.UI.open();

		/*
		 //Retrieve map tiles. This is an example of retriving the tiles 3km around one store.
		 //lib/maptiles.js contains functions for calculating which map tiles are required for each store.
		 //simply point the L.tileLayer('lib/{z}/{x}/{y}.png', {..}) in /map/map.js to where the tiles have been downloaded:

		 var maptiles = require('/lib/maptiles');
		 var prox = require('/lib/proximity');
		 var map = new maptiles();

		 //calculate 3km bounds around a store location
		 var bounds = prox.calculateBounds({lat:25.269133, lon: 55.323012}, 3000);

		 //calculate the map tiles required to cover the 3km area around the store
		 var tiles = map.getTileArea(bounds, 15);

		 Ti.API.info(tiles);

		 //download and save the tiles to application data directory
		 for(var i=0; i<tiles.length; i++){
		 	map.cacheTile(tiles[i], 'url_to_map_tiles');
		 }

		 */
	}
}

module.exports = APP;
