gApp.controller('MainCtrl', ['$scope', '$http', '$translate', '$filter', 'siNotifier',
function($scope, $http, $translate, $filter, siNotifier) {
	// Translation
	$scope.changeLanguage = function(lang) {
		$translate.use(lang);
	};

	$scope.setChannelGroup = function(grp) {
		if ( $scope.currentGroup && $scope.currentGroup === grp )
			grp = "";

		$scope.currentGroup = grp;
		if ( !grp )
			$scope.channels = $scope.allChannels;
		else
			$scope.channels = $scope.channelGroups[grp];
	};

	$scope._findChannelByName = function(name, chans) {
		if ( !chans ) return null;
		var l = chans.length;
		for ( var i = 0; l--; ++i )
			if ( chans[i].name === name )
				return chans[i];
		return null;
	};

	$scope.getChannelByName = function(name) {
		return $scope._findChannelByName(name, $scope.allChannels);
	};

	$scope.getCurrentGroupChannelByName = function(name) {
		return $scope._findChannelByName(name, $scope.channels);
	};

	$scope.convertEvent = function(evt) {
		var date = new Date(evt.start_time*1000);
		evt.end_time = new Date((evt.start_time+evt.duration)*1000);
		evt.start_time = date;
		evt.description = evt.description.split('\n');
		evt.channel_name = $scope.channelMap[evt.channel].name;
		return evt;
	}

	$scope.timer = function(evt) {
		$scope.currentTimer = {
			_update: false,
			channel: evt.channel,
			channel_name: evt.channel_name,
			filename: evt.title,
			day: $filter('date')(evt.start_time, 'yyyy-MM-dd'),
			start: $filter('date')(evt.start_time.getTime() - $scope.config.timer.margin.before*60*1000, 'HHmm'),
			stop: $filter('date')(evt.end_time.getTime() + $scope.config.timer.margin.after*60*1000, 'HHmm'),
			event_start_time: $filter('date')(evt.start_time, 'shortTime'),
			event_end_time: $filter('date')(evt.end_time, 'shortTime'),
			repeats: [false,false,false,false,false,false,false]
		};
		$('#add-timer').modal('show');
	};

	$scope.addTimer = function(timer) {
		/* TODO: Do validation
		var start = parseInt(timer.start);
		if ( isNaN(start) )
			;
		*/
		var strWD = "MTWTFSS";
		var weekdays = "";
		for ( var i = 0; i < 7; ++i )
			weekdays += timer.repeats[i]?strWD[i]:"-";

		var params = "file=" + encodeURI(timer.filename) + "&flags=1" +
		             "&start=" + timer.start + "&stop=" + timer.stop +
		             "&day=" + timer.day + "&channel=" + timer.channel +
		             "&weekdays=" + weekdays + "&";

		console.debug("'" + params + "'");
		$http.post($scope.config.API + "timers", params)
		.success(function(data, status) {
			siNotifier.success(gApp.translateFormat('TIMER_ADDED', timer.filename), "Timers");
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Timers");
		});
	};

	$scope.info = function(evt) {
		$scope.currentEvent = evt;
		$('#evt-info').modal('show');
	};

	$scope.loadChannels = function() {
		$http.get($scope.config.API + "channels.json")
		//$http.get('examples/channels.json')
		.success(function(data, status) {
			console.debug("Loaded channels");
			$scope.channels = data.channels;
			var l = $scope.channels.length;
			for ( var i = 0; l--; ++i ) {
				var chan = $scope.channels[i];
				$scope.channelMap[chan.channel_id] = chan;

				if ( !chan.group ) continue;

				if ( !$scope.channelGroups )
					$scope.channelGroups = {};
				if ( !$scope.channelGroups.hasOwnProperty(chan.group) )
					$scope.channelGroups[chan.group] = [];
				$scope.channelGroups[chan.group].push(chan);
			}

			$scope.allChannels = $scope.channels;
			siNotifier.success(gApp.translateFormat('CHANNELS_LOADED', $scope.allChannels.length), "Channels");
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Channels");
		});
	};

	$scope.loadConfig = function() {
		$http.get("conf.json")
		.success(function(data, status) {
			console.debug("Loaded config");
			$scope.config = data;
			$scope.loadChannels();
		})
		.error(function(data, status) {
			siNotifier.error(status?data:gApp.translate('CONNECTION_ERROR'), "Config");
		});
	};

	$scope.allChannels = null;
	$scope.channelMap = {};
	$scope.channelGroups = null;
	$scope.currentGroup = "";

	// Load configuration initially
	$scope.loadConfig();
}
]);
