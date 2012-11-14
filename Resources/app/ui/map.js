function map() {
	var self = this;

	this.UI = null;

	this.init = function() {
		var win = Ti.UI.createWindow({
			backgroundColor : '#fff',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL
		});

		var webView = Ti.UI.createWebView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			backgroundColor : '#fff',
			zIndex : 10,
			url: '/map/map.html'
		});

		win.add(webView);

		var button = Ti.UI.createButton({
			top : 10,
			right : 10,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			title : 'close',
			zIndex : 10
		});

		win.add(button);

		button.addEventListener('click', function(e) {
			self.UI.close()
		});

		self.UI = win;
	}
	
	self.init();
}

module.exports = map;
