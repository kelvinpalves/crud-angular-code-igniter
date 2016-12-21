<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cliente extends CI_Controller {

	public function atualizar() {
		$cliente = json_decode($this->input->raw_input_stream);
		$response = array('exec' => $this->ClienteModel->atualizar($cliente->id, $cliente));
		print_r(json_encode($response));
	}

	public function buscar() {
		print_r(json_encode($this->ClienteModel->buscarPorId($this->uri->segment(2))));
	}

	public function buscarTodos() {
		print_r(json_encode($this->ClienteModel->buscarTodos()));
	}

	public function excluir() {
		$response = array('exec' => $this->ClienteModel->excluir($this->uri->segment(3)));
		print_r(json_encode($response));
	}

	public function salvar() {
		$cliente = json_decode($this->input->raw_input_stream);
		$response = array('exec' => $this->ClienteModel->inserir($cliente));
		print_r(json_encode($response));
	}
}
