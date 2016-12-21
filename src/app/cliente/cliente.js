(function () {
	'use strict';

	angular
		.module('app.cliente')
		.controller('Cliente', Cliente);

	Cliente.$inject = ['cliente.dataservice'];

	/* @ngInject */
	function Cliente(dataservice) {
		var vm = this;

		vm.atualizar = atualizar;
		vm.buscar = buscar;
		vm.cancelar = cancelar;
		vm.cliente = {};
		vm.clientes = [];
		vm.editar = false;
		vm.excluir = excluir;
		vm.salvar = salvar;

		init();
		///////

		function atualizar(cliente) {
			return dataservice.atualizar(cliente).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao atualizar o cliente', 'ERRO');
			}

			function success(response) {
				if (response.data.exec) {
					buscarTodos();
					vm.editar = false;
					toastr.success('Sucesso ao atualizar o cliente', 'SUCESSO');
				} else {
					toastr.error('Erro ao atualizar o cliente', 'ERRO');
				}
			}	
		}

		function buscar(id) {
			return dataservice.buscar(id).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao carregar o cliente', 'ERRO');
			}

			function success(response) {
				vm.cliente = response.data;
				vm.editar = true;
			}	
		}

		function buscarTodos() {
			return dataservice.buscarTodos().then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao carregar os clientes', 'ERRO');
			}

			function success(response) {
				if (response.data != 'null') {
					vm.clientes = response.data;	
					vm.cliente = {};
				} else {
					vm.clientes = [];
				}
			}	
		}

		function cancelar() {
			vm.cliente = {};
			vm.editar = false;
		}

		function excluir(id) {
			return dataservice.excluir(id).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao excluir o cliente', 'ERRO');
			}

			function success(response) {
				if (response.data.exec) {
					buscarTodos();
					toastr.success('Sucesso ao excluir o cliente', 'SUCESSO');
				} else {
					toastr.error('Erro ao excluir o cliente', 'ERRO');
				}
			}
		}

		function init() {
			buscarTodos();
		}

		function salvar(cliente) {
			return dataservice.salvar(cliente).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao salvar o cliente', 'ERRO');
			}

			function success(response) {
				if (response.data.exec) {
					buscarTodos();
					toastr.success('Sucesso ao salvar o cliente', 'SUCESSO');
				} else {
					toastr.error('Erro ao salvar o cliente', 'ERRO');
				}
			}	
		}
	}
})();