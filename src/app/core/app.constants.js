(function () {
	'use strict';

	var backend = {
		url: 'http://localhost/crud-angular-code-igniter/server/'
	};

	angular
		.module('app')
		.constant('backend', backend)
		.constant('toastr', toastr);
})();