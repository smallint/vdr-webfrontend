gApp.controller('NowCtrl', ['$scope', '$http', '$routeParams', 'siNotifier',
function($scope, $http, $routeParams, siNotifier) {
	// TODO: Filter according to current channelgroup
	$scope.loadEPG = function(cha) {
		$http.get($scope.config.API + "events.json?timespan=1")
		.success(function(data, status) {
			$scope.events = data.events;
			var now = new Date();

			var i, l = $scope.events.length;
			for ( i = 0; l--; ++i ) {
				var evt = $scope.events[i];
				$scope.convertEvent(evt);

				var passed = (now - evt.start_time)/1000;
				if ( passed < 0 )
					evt.progress = 0;
				else if ( passed > evt.duration )
					evt.progress = 100;
				else
					evt.progress = passed/evt.duration * 100;
			}

			siNotifier.success(gApp.translateFormat('EVENTS_LOADED', $scope.events.length), "EPG");
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "EPG");
		});
	};

	$scope.$watch("config", function() {
		if ( !$scope.config ) return;
		$scope.loadEPG();
	});
}
]);
