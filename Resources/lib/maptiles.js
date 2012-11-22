//lib for lat/lon calculations
var prox = require('/lib/proximity');

var maptiles = function() {
	var self = this;

	/*
	 * Convert lat degree to tile number
	 */
	this.lat2tile = function(lat, zoom) {

		var lat_deg = prox.deg2rad(lat);
		var tile = Math.floor((1 - Math.log(Math.tan(lat_deg) + 1 / Math.cos(lat_deg)) / Math.PI) / 2 * Math.pow(2, zoom));
		return tile;
	};

	/*
	 * Convert lon degree to tile number
	 */
	this.lon2tile = function(lon, zoom) {
		var tile = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
		return tile;
	};

	/*
	 * Given the lat/lon find the tile
	 */
	this.getTile = function(lat, lon, zoom) {

		var x = self.lon2tile(lon, zoom);
		var y = self.lat2tile(lat, zoom);

		var tile = {
			z : zoom,
			x : x,
			y : y
		}

		return tile;
	};

	/*
	 * Given the lat/lon of a nw and se point of a bounding box, find the tiles in the area at the specified zoom level
	 */
	this.getTileArea = function(bounds, zoom) {

		var nwTile = self.getTile(bounds.maxLat, bounds.minLon, zoom);
		var seTile = self.getTile(bounds.minLat, bounds.maxLon, zoom);

		var count = 0;
		var tiles = [];

		Ti.API.info(bounds);
		Ti.API.info(JSON.stringify(nwTile));
		Ti.API.info(JSON.stringify(seTile));

		for (var x = nwTile.x; x <= seTile.x; x++) {

			for (var y = nwTile.y; y <= seTile.y; y++) {

				Ti.API.info(x + ' ' + y);
				tiles[count] = {
					x : x,
					y : y,
					z : zoom
				}
				count++;
			}
		}

		return tiles;
	}
	/*
	 * Fetch and save the tile locally
	 */
	this.cacheTile = function(tile, url) {
		var basedir = Ti.Filesystem.applicationDataDirectory;

		var mapdir = Ti.Filesystem.getFile(basedir, 'map');

		if (!mapdir.exists()) {
			mapdir.createDirectory();
		}

		var z = Ti.Filesystem.getFile(mapdir.nativePath, tile.z);

		

		if (!z.exists()) {
			z.createDirectory();
		}

		var x = Ti.Filesystem.getFile(z.nativePath, tile.x);

		if (!x.exists()) {
			x.createDirectory();
		}

		var y = Ti.Filesystem.getFile(x.nativePath, tile.y + '.png');
		Ti.API.info('path : ' + y.nativePath);
		
		//map tile is already cached skip.
		if (y.exists()) {
			return;
		}

		var xhr = Ti.Network.createHTTPClient({
			timeout : 5000,
			onload : function(e) {
				y.write(this.responseData);
			},
			onerror : function(e) {
				alert(JSON.stringify(e));
			}
		});

		var url = url + '/' + tile.z + '/' + tile.x + '/' + tile.y + '.png';
		alert(url);
		xhr.open('GET', url);
		xhr.send();

	}
}

module.exports = maptiles;
