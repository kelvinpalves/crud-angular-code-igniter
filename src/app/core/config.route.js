(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];			

	/* @ngInject */
	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'src/app/home/home.html',
				controller: 'Home',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
})();