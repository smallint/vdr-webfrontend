gApp.controller('RecsCtrl', ['$scope', '$timeout', '$http', '$filter', 'siNotifier', 'siDialog',
function($scope, $timeout, $http, $filter, siNotifier, siDialog) {
	$scope.loadRecordings = function() {
		$scope.recordings = [];

		console.debug("Loading recordings");
		$http.get($scope.config.API + "recordings.json")
		.success(function(data, status) {
			$scope.recordings = data.recordings;
			// Convert time stamps and add event_end_time
			var i, l = $scope.recordings.length;
			for ( i = 0; l--; ++i ) {
				var rec = $scope.recordings[i];
				var date = new Date(rec.event_start_time*1000);
				rec.event_end_time = new Date((rec.event_start_time+rec.event_duration)*1000);
				rec.event_start_time = date;
				rec.event_description = rec.event_description.split('\n');
			}
			siNotifier.success(gApp.translateFormat('RECORDINGS_LOADED', $scope.recordings.length), "Recordings");
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Recordings");
		});
	};

	$scope.remove = function(rec) {
		siDialog.yesno(
			$scope, gApp.translate('CMD_RECORDING_DELETE'),
			gApp.translateFormat('ASK_RECORDING_DELETE', rec.event_title),
			gApp.translate('YES'), gApp.translate('NO'),
			function() { $scope._remove(rec); return true; }
		);
	};

	$scope._remove = function(rec) {
		$http['delete']($scope.config.API + "recordings/" + rec.number)
		.success(function(data, status) {
			siNotifier.success(gApp.translateFormat('RECORDING_DELETED', timer.event_title), "Recordings");
			$scope.loadRecordings();
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Recordings");
		});
	};

	$scope.$watch("config", function() {
		if ( !$scope.config ) return;
		$scope.loadRecordings();
	});
}
]);
