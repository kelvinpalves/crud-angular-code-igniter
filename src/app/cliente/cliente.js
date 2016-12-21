(function () {
	'use strict';

	angular
		.module('app.cliente')
		.controller('Cliente', Cliente);

	Cliente.$inject = ['cliente.dataservice'];

	/* @ngInject */
	function Cliente(dataservice) {
		var vm = this;

		vm.buscar = buscar;
		vm.cancelar = cancelar;
		vm.cliente = {};
		vm.clientes = [];

		init();
		///////

		function buscar(id) {
			return dataservice.buscar(id).then(success).catch(error);

			function error(response) {
				console.log('Error:' + response);
			}

			function success(response) {
				console.log(response);
				vm.cliente = response.data;
			}	
		}

		function buscarTodos() {
			return dataservice.buscarTodos().then(success).catch(error);

			function error(response) {
				console.log('Error:' + response);
			}

			function success(response) {
				vm.clientes = response.data;
			}	
		}

		function cancelar() {
			vm.cliente = {};
		}

		function init() {
			buscarTodos();
		}



	}
})();