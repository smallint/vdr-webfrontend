/*
 AngularJS dialog module which depends on Semantic UI
 (c) 2014 Jan Becker, tahoma@gmx.de
 License: GPLv3
*/
angular.module('smallint.dialog', [])
.factory('siDialog', ['$compile', function($compile) {
	return {
		yesno: function(scope, title, msg, labelYes, labelNo, funcYes, funcNo) {
			var template = '<div class="ui small modal" id="ask-yesno">' +
			                 '<div class="ui center aligned header">' + title + '</div>' +
			                 '<div class="content" style="text-align:center">' + msg + '</div>' +
			                 '<div class="actions">' +
			                   '<div class="two fluid ui buttons">' +
			                     '<div class="ui negative labeled icon button">' +
			                       '<i class="remove icon"></i>' +
			                       labelNo +
			                     '</div>' +
			                     '<div class="ui positive right labeled icon button">' +
			                       labelYes +
			                       '<i class="checkmark icon"></i>' +
			                     '</div>' +
			                   '</div>' +
			                 '</div>' +
			               '</div>';
			var linkFn = $compile(template);
			var element = linkFn(scope);
			var body = angular.element(document).find('body');
			body.append(element);
			element
			.modal('setting', {
				onHidden: function() { element.remove(); },
				onDeny: funcNo,
				onApprove: funcYes
			})
			.modal('show');
		}
	};
}]);