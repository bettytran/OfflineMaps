var searchController = require('app/ui/search');

var APP = {
	init : function() {

		var search = new searchController();
		search.UI.open();
	}
}

module.exports = APP;
