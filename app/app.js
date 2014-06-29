var gApp = angular.module('VDR', ['ngRoute', 'pascalprecht.translate', 'smallint.notifier', 'smallint.dialog']);

gApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/now', {
			templateUrl: 'app/templates/now.html',
			controller: 'NowCtrl'
		})
		.when('/epg/:channelname?', {
			templateUrl: 'app/templates/epg.html',
			controller: 'EPGCtrl'
		})
		.when('/timers', {
			templateUrl: 'app/templates/timers.html',
			controller: 'TimersCtrl'
		})
		.when('/recordings', {
			templateUrl: 'app/templates/recs.html',
			controller: 'RecsCtrl'
		})
		.otherwise({
			redirectTo: '/now'
		});
}
]);

gApp.run(['$filter', function($filter) {
	// Store the translation filter for later usage
	gApp._translateFilter = $filter('translate');

	$('.ui.sidebar')
	.sidebar({overlay:true})
	.sidebar('attach events', '#menu-launch')
	.mouseleave(function(event) {
		$(this).sidebar('hide');
	}
	);

	$('.ui.modal').modal();

	$('#about-dlg')
	.modal('attach events', '.item.about', 'show')
	;
}]);