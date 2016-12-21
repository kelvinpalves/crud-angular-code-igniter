CREATE DATABASE exemplo_ci;

CREATE TABLE cliente
(
	id integer primary key auto_increment,
	nome varchar(255) not null,
	email varchar(255) not null unique
);