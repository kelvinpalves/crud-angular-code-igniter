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
				templateUrl: 'src/app/cliente/cliente.html',
				controller: 'Cliente',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
})();