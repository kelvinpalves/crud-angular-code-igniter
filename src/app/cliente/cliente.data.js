(function () {
	'use strict';

	angular
		.module('app.cliente')
		.factory('cliente.dataservice', dataservice);

	dataservice.$inject = ['$http', '$location', '$q'];

	/* @ngInject */
	function dataservice($http, $location, $q) {
		var service = {
			buscar: buscar,
			buscarTodos: buscarTodos
		};	

		return service;

		function buscar(id) {
			return $http.get('http://localhost/crud-angular-code-igniter/server/cliente/' + id);
		}

		function buscarTodos() {
			return $http.get('http://localhost/crud-angular-code-igniter/server/cliente');
		}
	}
})();