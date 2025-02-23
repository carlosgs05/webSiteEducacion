-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 23-02-2025 a las 05:10:17
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `websiteeducationbackend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `home_carrusel`
--

DROP TABLE IF EXISTS `home_carrusel`;
CREATE TABLE IF NOT EXISTS `home_carrusel` (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`idImagen`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `home_carrusel`
--

INSERT INTO `home_carrusel` (`idImagen`, `imagen`) VALUES
(1, '1740281872_egresados.jpg'),
(2, '1740282626_img_02.jpg'),
(3, '1740282626_img_01.png'),
(4, '1740282785_carrusel_02.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
