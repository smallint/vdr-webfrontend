gApp.controller('TimersCtrl', ['$scope', '$http', 'siNotifier', 'siDialog',
function($scope, $http, siNotifier, siDialog) {
	// TODO: Filter according to current channelgroup
	$scope.loadTimers = function() {
		$scope.timers = [];

		console.debug("Loading Timers");
		$http.get($scope.config.API + "timers.json")
		.success(function(data, status) {
			$scope.timers = data.timers;
			siNotifier.success(gApp.translateFormat('EVENTS_LOADED', $scope.timers.length), "Timers");
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Timers");
		});
	};

	$scope.toggle = function(timer) {
		alert("Not yet implemented - Toggle active flag of timer " + timer.id);
	};

	$scope.edit = function(timer) {
		alert("Not yet implemented - Edit timer " + timer.id);
	};

	$scope.remove = function(timer) {
		siDialog.yesno(
			$scope, gApp.translate('CMD_TIMER_DELETE'),
			gApp.translateFormat('ASK_TIMER_DELETE', timer.filename),
			gApp.translate('YES'), gApp.translate('NO'),
			function() { $scope._remove(timer); return true; }
		);
	};

	$scope._remove = function(timer) {
		$http['delete']($scope.config.API + "timers/" + timer.id)
		.success(function(data, status) {
			siNotifier.success(gApp.translateFormat('TIMER_DELETED', timer.filename), "Timers");
			$scope.loadTimers();
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Timers");
		});
	};

	$scope.$watch("config", function() {
		if ( !$scope.config ) return;
		$scope.loadTimers();
	});
}]);
