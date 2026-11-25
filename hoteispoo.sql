-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 25/11/2026 às 13:56
-- Versão do servidor: 8.4.7
-- Versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `hoteispoo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `hospedes`
--

DROP TABLE IF EXISTS `hospedes`;
CREATE TABLE IF NOT EXISTS `hospedes` (
  `id_hospede` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_hospede`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `hospedes`
--

INSERT INTO `hospedes` (`id_hospede`, `nome`, `cpf`, `telefone`, `senha`) VALUES
(1, 'Egberto', '61927370370', '88994878829', NULL),
(3, 'Jefferson', '10344636321', '88992018883', NULL),
(4, 'Yllana', '00987654321', '88997367218', '$2b$10$ZIUd97lAdNCLETThW6f4SutR9yvW5xlUt044ULv60cZ/fJibvXeOG'),
(5, 'Alan', '11123456789', '88992314590', '$2b$10$OxGqgG4qwcjzRhNdLaIga.9UT55Z3AbPUsa/iWO.kh5poIC1D7jx.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `quartos`
--

DROP TABLE IF EXISTS `quartos`;
CREATE TABLE IF NOT EXISTS `quartos` (
  `id_quarto` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor_diaria` int NOT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_quarto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `quartos`
--

INSERT INTO `quartos` (`id_quarto`, `numero`, `tipo`, `valor_diaria`, `status`) VALUES
(1, '1', 'VIP', 480, 'Disponivel');

-- --------------------------------------------------------

--
-- Estrutura para tabela `reservas`
--

DROP TABLE IF EXISTS `reservas`;
CREATE TABLE IF NOT EXISTS `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `data_checkin` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_checkout` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hospede_id` int DEFAULT NULL,
  `quarto_id` int DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_reserva_hospede` (`hospede_id`),
  KEY `fk_reserva_quarto` (`quarto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `data_checkin`, `data_checkout`, `hospede_id`, `quarto_id`) VALUES
(1, '11/11/2026', '12/11/2026', 1, 1),
(6, '26/12/2026', '30/12/2026', 1, 1),
(7, '11/12/2026', '14/12/2026', 3, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reserva_hospede` FOREIGN KEY (`hospede_id`) REFERENCES `hospedes` (`id_hospede`),
  ADD CONSTRAINT `fk_reserva_quarto` FOREIGN KEY (`quarto_id`) REFERENCES `quartos` (`id_quarto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
