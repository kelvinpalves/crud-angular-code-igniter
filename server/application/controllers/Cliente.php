<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cliente extends CI_Controller {

	public function atualizar() {

	}

	public function buscar() {
		print_r(json_encode($this->ClienteModel->buscarPorId($this->uri->segment(2))));
	}

	public function buscarTodos() {
		print_r(json_encode($this->ClienteModel->buscarTodos()));

	}

	public function remover() {

	}

	public function salvar() {
		$cliente = json_decode($this->input->raw_input_stream);
		$response = array('exec' => $this->ClienteModel->inserir($cliente));
		print_r(json_encode($response));
	}
}