Titanium Offline Maps
======================

This Titanium application for Android and iOS demonstrates an implemenation of a slippy map that is available offline. 

###How it works

The application works by utlizing the leaflet.js library to create the slippy map. A webview is then used to display the map.

Map tiles were generated using TileMill (https://www.mapbox.com/tilemill). The map data used the generate the map tiles was obtained from the OpenStreetMap API (openstreetmap.org).

For more information on how to import map data into TileMill for tile generation: https://www.mapbox.com/tilemill/docs/guides/osm-bright-mac-quickstart/


###Useful bits of code 

__proximity.js__ (Resources/lib/proximity.js)

A CommonJS module containing two calculations:

- The distance between two geolocations 
- The max/min latitude and longitude boundries of an area  that surrounds a given distance of a location.

__maptiles.js__ (Resources/lib/maptiles.js)

A CommonJS module containing the following functions:

- Calculates the corresponding map tile given a latitude and longitude of a point.
- Given the latitude and longitude boundaries of a bounding box, find the tiles that cover that area at a specified zoom level.
- A function to cache map tiles locally.
