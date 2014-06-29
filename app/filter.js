// Store the format filter for later usage without needing to look it up
gApp._formatFilter = function(format, args) {
	if ( !angular.isArray(args) ) args = Array.prototype.slice.call(arguments, 1);
	return format.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
};

gApp
.filter('duration', function() {
	return function(d) {
		var m = (d / 60) | 0;
		var h = (m / 60) | 0;
		m = m % 60;
		if ( m < 10 ) m = '0' + m;
		if ( h < 10 ) h = '0' + h;

		return h + ':' + m;
	};
})
.filter('format', function() {
	return gApp._formatFilter;
});