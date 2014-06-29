gApp.controller('EPGCtrl', ['$scope', '$http', '$location', '$routeParams', 'siNotifier',
function($scope, $http, $location, $routeParams, siNotifier) {
	$scope.loadEPG = function(cha) {
		$scope.events = cha?[]:null;
		$scope.epg = null;
		if ( !cha ) return;

		console.debug("Loading EPG for " + cha.name);
		$http.get($scope.config.API + "events/" + cha.channel_id + ".json")
		.success(function(data, status) {
			$scope.events = data.events;
			$scope.epg = [];

			var item = null;
			var i, l = $scope.events.length;
			for ( i = 0; l--; ++i ) {
				var evt = $scope.events[i];
				$scope.convertEvent(evt);
				var date = evt.start_time;

				if ( !item || item.date.getFullYear() != date.getFullYear() ||
					item.date.getMonth() != date.getMonth() ||
					item.date.getDate() != date.getDate() ) {
					item = { date: date, events: [] };
					$scope.epg.push(item);
				}

				item.events.push(evt);
			}

			siNotifier.success(gApp.translateFormat('EVENTS_LOADED', $scope.events.length), cha.name + " EPG");
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), cha.name + " EPG");
		});
	};

	$scope.toggle = function(evt) {
		evt.selected = !evt.selected;
	}

	$scope.$watch("channels", function(newval, oldval) {
		if ( newval !== oldval ) {
			// Reload EPG if not already done
			if ( !$scope.epg && $scope.channelname )
				$scope.loadEPG($scope.getChannelByName($scope.channelname));

			// redirect back to main page if the current channel name is filtered out
			if ( !$scope.getCurrentGroupChannelByName($scope.channelname) )
				$location.path('/epg');
		}
	});

	$scope.channelname = $routeParams.channelname;

	$scope.$watch("config", function() {
		if ( !$scope.config ) return;
		$scope.loadEPG($scope.channelname?$scope.getChannelByName($scope.channelname):null);
	});
}
]);
