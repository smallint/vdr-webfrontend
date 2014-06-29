gApp
.directive('multiline', function($parse) {
	return {
		link: function(scope, elem, attr) {
			var data = $parse(attr.multiline)(scope);
			if ( data ) {
				var l = data.length;
				elem.html('');
				for ( var i = 0; l--; ++i ) {
					elem.append(data[i]+ "<br/>");
				}
			}
		}
	};
})
.directive('multilineWatch', function($parse) {
	return {
		link: function(scope, elem, attr) {
			scope.$watch(attr.multilineWatch, function(newval, oldval) {
				var data = $parse(attr.multilineWatch)(scope);
				if ( data ) {
					var l = data.length;
					elem.html('');
					for ( var i = 0; l--; ++i ) {
						elem.append(data[i]+ "<br/>");
					}
				}
			});
		}
	};
})
.directive('ellipsis', function($parse) {
	return {
		link: function(scope, elem, attr) {
			var data = $parse(attr.ellipsis)(scope);
			var len = $parse(attr.len)(scope);
			if ( !len ) len = 80;
			if ( data ) {
				var t = data[0];
				if ( t.length > len ) t = t.substr(0,len);
				elem.append(t + " ...");
			}
		}
	};
})
.directive('activeLink', ['$location', function(location) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller) {
			var clazz = attrs.activeLink;
			var path = attrs.href;
			path = path.substring(1); //hack because path does not return including hashbang
			scope.location = location;
			scope.$watch('location.path()', function(newPath) {
				if (path === newPath)
					element.addClass(clazz);
				else
					element.removeClass(clazz);
			});
		}
	}
}]);
