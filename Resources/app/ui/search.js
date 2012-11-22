var searchModel = require('app/models/search');

function search() {
	var self = this;

	this.UI = null;
	this.table = null;

	this.Model = new searchModel();

	this.init = function() {
		var win = Ti.UI.createWindow({
			backgroundColor : '#fff',
			layout : 'vertical'
		});

		var button = Ti.UI.createButton({
			top : 20,
			height : 30,
			width : 100,
			title : 'Search'
		});

		win.add(button);
		

		button.addEventListener('click', function(e) {
			self.buildRows(self.Model.storeSearch());
		});

		self.table = Ti.UI.createTableView({
			backgroundColor : '#fff',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			top : 50
		});

		win.add(self.table);

		self.table.addEventListener('click', function(e) {
			var map = require('app/ui/map');
			mapView = new map();
			mapView.UI.open();
			
			//A small time out to allow the webview to load
			setTimeout(function() {
				mapView.setMarker(self.Model.data[e.index]);
			}, 500);
			
		});

		self.UI = win;
	};

	this.buildRows = function(data) {
		var rows = [];

		for (var i = 0; i < data.length; i++) {
			rows[i] = Ti.UI.createTableViewRow({
				hasChild : true,
				color : '#000',
				className : 'result',
				height : 50
			});

			var label = Ti.UI.createLabel({
				text : data[i].title + ' ' + data[i].proximity + ' km',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				right : 5,
				textAlign : 'center',
				font : {
					fontWeight : 'normal',
					fontSize : '11',
					fontFamily : 'Helvetica Neue'
				}
			});

			rows[i].add(label);
		}

		self.table.setData(rows);
	}

	this.init();
}

module.exports = search;
