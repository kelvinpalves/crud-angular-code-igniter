(function () {
	'use strict';

	angular
		.module('app.cliente')
		.factory('cliente.dataservice', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'backend'];

	/* @ngInject */
	function dataservice($http, $location, $q, backend) {
		var service = {
			atualizar: atualizar,
			buscar: buscar,
			buscarTodos: buscarTodos,
			excluir: excluir,
			salvar: salvar
		};	

		return service;

		function atualizar(data) {
			return $http.post(backend.url + 'cliente/atualizar', data);
		}

		function buscar(id) {
			return $http.get(backend.url + 'cliente/' + id);
		}

		function buscarTodos() {
			return $http.get(backend.url + 'cliente');
		}

		function excluir(id) {
			return $http.post(backend.url + 'cliente/excluir/' + id);
		}

		function salvar(data) {
			return $http.post(backend.url + 'cliente/salvar', data);
		}
	}
})();