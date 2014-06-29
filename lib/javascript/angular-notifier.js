/*
 AngularJS notification module
 (c) 2014 Jan Becker, tahoma@gmx.de
 License: GPLv3
*/
angular.module('smallint.notifier', [])
.run(['$timeout', function($timeout) {
	var Notifier = window.Notifier = {};
	var pos = ["bottom", "right"];
	var parent = angular.element("<div></div>");

	var cfg = Notifier.Config = {
		timeout: 5000
	};

	parent.css("position", "absolute");
	parent.css("z-index", 9999);
	parent.css("padding", "12px");
	parent.css(pos[0], "0");
	parent.css(pos[1], "0");
	var body = angular.element(document).find('body');
	body.append(parent);

	Notifier.notify = function(message, title, klass, timeout) {
		var eRoot = angular.element('<div class="notify ' + klass + '">');

		if ( timeout === undefined )
			timeout = cfg.timeout;

		var eIcon = angular.element('<div class="icon"/>');
		eRoot.append(eIcon);

		var eContent = angular.element('<div class="content"/>');

		if ( title ) {
			var eTitle = angular.element('<div class="title"/>');
			eTitle.append(document.createTextNode(title));
			eContent.append(eTitle);
		}

		if ( message ) {
			var eMsg = angular.element('<div class="msg"/>');
			//eMsg.append(document.createTextNode(message));
			eMsg.html(message);
			eContent.append(eMsg);
		}

		if ( timeout ) {
			$timeout(function() {
				if ( typeof eRoot['fadeOut'] === "function" ) {
					eRoot.fadeTo(600, 0, function() {
						eRoot.animate({height:'0px'}, 200, function() {
							eRoot.remove();
						});
					});
				}
				else
					eRoot.remove();
			}, timeout);
		}

		eRoot.bind("click", function() {
			if ( timeout )
				eRoot.css('display','none');
			else
				eRoot.remove();
		});

		eRoot.append(eContent);
		parent.append(eRoot);
	};

	Notifier.info = function(message, title, timeout) {
		Notifier.notify(message, title, "info", timeout);
	};

	Notifier.warning = function(message, title, timeout) {
		Notifier.notify(message, title, "warning", timeout);
	};

	Notifier.error = function(message, title, timeout) {
		Notifier.notify(message, title, "error", timeout);
	};

	Notifier.success = function(message, title, timeout) {
		Notifier.notify(message, title, "success", timeout);
	};
}])
.factory('siNotifier', function() {
	return {
		error: function(msg, title, staytime) {
			Notifier.error(msg, title, staytime);
		},
		warning: function(msg, title, staytime) {
			Notifier.warning(msg, title, staytime);
		},
		info: function(msg, title, staytime) {
			Notifier.info(msg, title, staytime);
		},
		success: function(msg, title, staytime) {
			Notifier.success(msg, title, staytime);
		}
	};
});
