(function () {
	'use strict';

	angular
		.module('app.cliente')
		.controller('Cliente', Cliente);

	Cliente.$inject = ['cliente.dataservice', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$compile', '$scope'];

	/* @ngInject */
	function Cliente(dataservice, DTOptionsBuilder, DTColumnBuilder, $q, $compile, $scope) {
		var vm = this;

		vm.atualizar = atualizar;
		vm.buscar = buscar;
		vm.cancelar = cancelar;
		vm.cliente = {};
		vm.clientes = [];
		vm.editar = false;
		vm.excluir = excluir;
		vm.salvar = salvar;

		vm.dtColumns = {};
		vm.dtInstance = {};
		vm.dtOptions = {};
		vm.reloadData = reloadData;

		init();
		///////

		function atualizar(cliente) {
			return dataservice.atualizar(cliente).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao atualizar o cliente', 'ERRO');
			}

			function success(response) {
				if (response.data.exec) {
					reloadData();
					vm.editar = false;
					vm.cliente = {};
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

		function criarTabela() {
			carregarDtOptions();

			function carregarDtColumns() {
				vm.dtColumns = [
					DTColumnBuilder.newColumn('nome').withTitle('Nome'),
					DTColumnBuilder.newColumn('email').withTitle('Email'),
					DTColumnBuilder.newColumn('id').withTitle('Ações')
						.renderWith(function (data) {
							return '<div class="text-center">' +
								   		'<button class="btn-table btn btn-primary editar"><span class="glyphicon glyphicon-edit"></span></button>&nbsp;' +
										'<button class="btn-table btn btn-danger remover"><span class="glyphicon glyphicon-trash"></span></button>' +
							   		'</div>';
						})
				];
			}

			function carregarDtOptions() {
				vm.dtOptions = DTOptionsBuilder.newOptions()
					.withOption('ajax', ajax)
					.withPaginationType('full_numbers')
					.withOption('createdRow', createdRow)
					.withOption('rowCallback', rowCallback)
					.withBootstrap();

				carregarDtColumns();

				function ajax(data, callback, settings) {
					dataservice.buscarTodos().then(function (response) {
						if (response.data == 'null') {
							callback([]);
						} else {
							callback(response.data);
						}	
					});
				}

				function createdRow(row, data, dataIndex) {
	        		$compile(angular.element(row).contents())(vm);
				}

				function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
					$('td:nth-child(3) .editar', nRow).unbind('click');
					$('td:nth-child(3) .editar', nRow).bind('click', function () {
						$scope.$apply(function () {
							vm.buscar(aData.id);
						});
					});

					$('td:nth-child(3) .remover', nRow).unbind('click');
					$('td:nth-child(3) .remover', nRow).bind('click', function () {
						$scope.$apply(function () {
							vm.excluir(aData.id);
						});
					});
				}
			}
		}

		function excluir(id) {
			return dataservice.excluir(id).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao excluir o cliente', 'ERRO');
			}

			function success(response) {
				if (response.data.exec) {
					reloadData();
					toastr.success('Sucesso ao excluir o cliente', 'SUCESSO');
				} else {
					toastr.error('Erro ao excluir o cliente', 'ERRO');
				}
			}
		}

		function init() {
			criarTabela();
		}

		function reloadData() {
			var resetPaging = false;
			vm.dtInstance.reloadData(null, resetPaging);
		}

		function salvar(cliente) {
			return dataservice.salvar(cliente).then(success).catch(error);

			function error(response) {
				toastr.error('Erro ao salvar o cliente', 'ERRO');
			}

			function success(response) {
				if (response.data.exec) {
					reloadData();
					vm.cliente = {};
					toastr.success('Sucesso ao salvar o cliente', 'SUCESSO');
				} else {
					toastr.error('Erro ao salvar o cliente', 'ERRO');
				}
			}	
		}
	}
})();