-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2024 a las 03:11:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vehicle_inspection`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `driver`
--

CREATE TABLE `driver` (
  `driver_id` smallint(5) UNSIGNED NOT NULL,
  `user_id` smallint(5) UNSIGNED DEFAULT NULL,
  `name` varchar(40) NOT NULL,
  `license_until` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `driver`
--

INSERT INTO `driver` (`driver_id`, `user_id`, `name`, `license_until`, `created_at`, `updated_at`) VALUES
(1, 1, 'Luis Albeiro Ramos', '2029-04-21', '2024-08-29 12:01:16', '2024-09-16 14:02:37'),
(218, 2, 'Luis Alfonso Romero Moncada', '2033-07-05', '2024-08-29 12:13:44', NULL),
(239, 3, 'Carlos Andres Mosquera Restrepo', '2027-01-31', '2024-08-29 12:18:47', NULL),
(240, 4, 'Bernardo Antonio Lopez Alzate', '2027-03-21', '2024-08-29 12:18:47', NULL),
(241, 5, 'Carlos Enrique Velasquez Rivera', '2025-03-16', '2024-08-29 12:18:47', NULL),
(242, 6, 'Diego Jimenez Gutierrez', '2025-09-08', '2024-08-29 12:18:47', NULL),
(243, 7, 'Luis Edilson Manrique Hernandez', '2033-02-01', '2024-08-29 12:18:47', NULL),
(244, 8, 'Nelson Arteaga', '2029-12-17', '2024-08-29 12:18:47', NULL),
(245, 9, 'Diego Valencia Cardona', '2028-08-10', '2024-08-29 12:18:47', NULL),
(246, 10, 'Luis Fernando Quintana Lozano', '2031-07-17', '2024-08-29 12:18:47', NULL),
(247, 11, 'Ruben Dario Serna Lopez', '2024-06-24', '2024-08-29 12:18:47', NULL),
(248, 12, 'Luis Carlos Trejos Aguirre', '2025-01-11', '2024-08-29 12:18:47', NULL),
(249, 13, 'Miguel Angel Gomez Aristizabal', '2024-09-07', '2024-08-29 12:18:47', NULL),
(250, 14, 'Federman Zapata Agudelo', '2025-02-23', '2024-08-29 12:18:47', NULL),
(251, 15, 'Julio Cesar Velasquez Garcia', '2026-08-23', '2024-08-29 12:18:47', NULL),
(252, 16, 'Luis Eduardo Restrepo Osorio', '2025-08-12', '2024-08-29 12:18:47', NULL),
(253, 17, 'Jhon Jairo Lopez Castrillon', '2026-02-08', '2024-08-29 12:18:47', NULL),
(254, 18, 'Luis Fernando Loaiza Jimenez', '2025-06-03', '2024-08-29 12:18:47', NULL),
(255, 19, 'Alexander Gutierrez Naranjo', '2024-12-21', '2024-08-29 12:18:47', NULL),
(256, 20, 'Hernando Carmona Hincapie', '2029-07-27', '2024-08-29 12:18:47', NULL),
(257, 21, 'Ramon Antonio Quintero Cardenas', '2028-06-20', '2024-08-29 12:18:47', NULL),
(258, 22, 'Jonatan Blandon Salazar', '2027-08-17', '2024-08-29 12:18:47', NULL),
(261, 23, 'John Mauricio Munera', '2033-10-07', '2024-09-23 10:01:44', '2024-09-23 10:02:15'),
(262, 24, 'Jose Fernando Velez Ospina', '2025-07-03', '2024-09-23 10:03:23', NULL),
(263, 25, 'Jose Guillermo Londoño Valencia', '2024-08-03', '2024-09-23 10:03:58', NULL),
(264, 26, 'Robinson Leandro Soto Alvarez', '2032-08-19', '2024-09-23 10:05:02', NULL),
(265, 27, 'Jhon Jairo Franco Valencia', '2025-07-22', '2024-09-23 10:06:19', NULL),
(266, 28, 'Oscar Guillermo Carmona Vega', '2025-01-12', '2024-09-23 10:07:18', NULL),
(267, 29, 'Jose Eliecer Osorio', '2024-10-30', '2024-09-23 10:07:46', NULL),
(268, 66, 'Carlos Hernando Duque Osorio', '2029-02-08', '2024-09-23 11:32:29', NULL),
(270, 67, 'Jose Duvan Betancourt Arango', '2029-07-31', '2024-09-23 11:33:30', NULL),
(271, 68, 'Mario Fernando Zuluaga Ospina', '2027-01-12', '2024-09-23 11:34:07', NULL),
(272, 69, 'Jose Ricardo Vasquez Alzate', '2031-03-08', '2024-09-23 11:34:47', NULL),
(273, 70, 'Mauricio Andres Ramirez Blandon', '2031-10-14', '2024-09-23 11:35:20', NULL),
(274, 71, 'Yeison Adolfo Suarez Franco', '2031-03-04', '2024-09-23 11:35:56', '2024-09-23 11:36:18'),
(275, 72, 'Diego Leander Ojeda Hermida', '2032-12-17', '2024-09-23 11:36:55', NULL),
(276, 73, 'Alvaro Loaiza Tabares', '2030-03-23', '2024-09-23 11:37:29', NULL),
(277, 74, 'Efredy Restrepo Bermudez', '2024-09-24', '2024-09-23 11:38:06', NULL),
(278, 75, 'Jose Vidal Muñoz Muñoz', '2025-08-23', '2024-09-23 11:38:42', NULL),
(279, 76, 'Jose Duban Salazar Aguirre', '2026-12-16', '2024-09-23 11:39:09', NULL),
(280, 77, 'Edwin Alberto Muñoz Rojas', '2026-10-30', '2024-09-23 11:39:51', NULL),
(281, 78, 'Gustavo Adolfo Buitrago Tobon', '2033-05-30', '2024-09-23 11:40:58', NULL),
(282, 79, 'Jose Albeiro Rengifo Orozco', '2033-03-13', '2024-09-23 11:41:50', NULL),
(283, 80, 'Luis Humberto Londoño Valencia', '2027-04-16', '2024-09-23 11:42:31', NULL),
(284, 81, 'Daniel Felipe Ramirez Alvarez', '2032-03-10', '2024-09-23 11:43:28', NULL),
(285, 82, 'Jorge Miguel Gonzalez Vasquez', '2025-06-13', '2024-09-23 11:44:02', NULL),
(286, 83, 'Luis Felipe Lopez Hurtado', '2024-10-26', '2024-09-23 11:44:31', NULL),
(287, 84, 'Carlos Eduardo Giraldo Aristizabal', '2024-11-23', '2024-09-23 11:44:58', NULL),
(288, 85, 'Jesnes Alesis Garcia Vivas', '2033-10-04', '2024-09-23 11:45:43', NULL),
(289, 86, 'David Fernando Urrea Gomez', '2034-07-25', '2024-09-23 11:46:15', NULL),
(290, 87, 'Arley Castaño Morales', '2032-10-10', '2024-09-23 11:46:40', NULL),
(291, 88, 'Miguel Angel Bueno Tapasco', '2034-07-29', '2024-09-23 11:47:07', NULL),
(292, 89, 'Juan Jose Alvarez', '2031-01-05', '2024-09-23 11:47:34', NULL),
(293, 90, 'Jean Paul Puerta Salazar ', '2025-05-15', '2024-09-24 08:49:14', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inspection`
--

CREATE TABLE `inspection` (
  `inspection_id` int(10) UNSIGNED NOT NULL,
  `driver_id` smallint(5) UNSIGNED NOT NULL,
  `vehicle_id` smallint(5) UNSIGNED DEFAULT NULL,
  `mileage` int(100) UNSIGNED NOT NULL,
  `checked_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token`
--

CREATE TABLE `token` (
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `cedula` int(11) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(120) NOT NULL,
  `role` enum('ADMIN','AUDITOR','CONDUCTOR') NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiration` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `cedula`, `email`, `password`, `role`, `status`, `reset_token`, `reset_token_expiration`, `created_at`, `updated_at`) VALUES
(1, 10103350, '10103350@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-09-02 11:58:25'),
(2, 10001088, 'preoperacionalchequeo@gmail.com', '$2b$10$4GhC7J2fSsiRJ3jL.DukouKaqKIuhHP7UrIvaB3bpma8zUWAv7AUu', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-09-24 15:35:54'),
(3, 18522746, '18522746@serviciudad.com', '$2b$10$Ty.odk4NSfXluuqEaRbbwu/WHxzkcpqGTMOBt8x7bLcq3RxIddXji', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-09-24 15:29:16'),
(4, 18509364, '18509364@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(5, 10107355, '10107355@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(6, 18507974, '18507974@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(7, 10126179, '10126179@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(8, 10115001, '10115001@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(9, 18592080, '18592080@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(10, 18507166, '18507166@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(11, 18509602, '18509602@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(12, 18500459, '18500459@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(13, 10097254, '10097254@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(14, 10125485, '10125485@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(15, 10009598, '10009598@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(16, 10088014, '10088014@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(17, 10127167, '10127167@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(18, 18507268, '18507268@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(19, 10006881, '10006881@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(20, 18504346, '18504346@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(21, 18502205, '18502205@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(22, 18521221, '18521221@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(23, 71756377, '71756377@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-09-23 10:02:27'),
(24, 10130908, '10130908@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(25, 10095409, '10095409@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(26, 14570941, '14570941@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(27, 10127023, '10127023@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(28, 18519280, '18519280@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(29, 10082435, '10082435@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(30, 18509287, '18509287@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(31, 18504885, '18504885@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(32, 10109722, '10109722@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(33, 10007245, '10007245@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(34, 18507330, '18507330@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(35, 18522723, '18522723@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(36, 18522856, '18522856@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(37, 18507689, '18507689@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(38, 10100591, '10100591@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(39, 18508473, '18508473@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(40, 18506975, '18506975@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(41, 18520916, '18520916@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 0, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(42, 18504254, '18504254@serviciudad.com', '$2a$12$IIldJOaJ4IXp8CrseQA6EOYgD88KMhXd7JInMAvxBkGajMXRjwrkK', 'CONDUCTOR', 1, NULL, NULL, '2024-08-29 11:37:21', '2024-08-29 11:37:21'),
(65, 18500063, '18500063@serviciudad.com', '$2b$10$V.0/9hGtjXJ9gGAX9PSeXek4UcI0xVPrwGvXUDpEDSiYpK9c32U6e', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:09:12', NULL),
(66, 18503324, '18503324@serviciudad.com', '$2b$10$jQ.gbgHszEozUv7Q/4GB2e/YX5a1GrLosYRVMlxqXIpTdbn/uT0ZC', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:09:30', NULL),
(67, 18508042, '18508042@serviciudad.com', '$2b$10$RXv23t78ED78dm1hRWsc6.RJHYn11TdZdZYBRLsTY6Mr4MRb37X/i', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:09:44', NULL),
(68, 18522389, '18522389@serviciudad.com', '$2b$10$3UY.X5eCG4QiGymlesTIYuv8vOMfU8GsF6bHoudVOXNbPDDjfeABO', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:09:56', NULL),
(69, 1087997666, '1087997666@serviciudad.com', '$2b$10$ka4mZ0pcodrmVMcjyuItWud5L2fD9xlg4Lu3p.cx78Mu36zboshVi', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:10:11', NULL),
(70, 1088256575, '1088256575@serviciudad.com', '$2b$10$o7PKXqxi6cDWUdwAkuxprOpP4C6exT2KdZiexmbuewS1a9JwukMtS', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:10:24', NULL),
(71, 1059701062, '1059701062@serviciudad.com', '$2b$10$Kh8KNtlrFGvFfmpSFb.TouU2rK4pozj4O.92KxiMLD9yedYuicoem', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:10:39', NULL),
(72, 1088316819, '1088316819@serviciudad.com', '$2b$10$vMDlFxUPXOAeHzazp6GW8uNf/UixgPsyWQdmdu/4zUy7yt2waQSQK', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:10:54', NULL),
(73, 10120373, '10120373@serviciudad.com', '$2b$10$pfNFK.iy9NFdYicaavc1AOubJybBu75jPRUK3hpYg/YzU6I47mUTy', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:11:07', NULL),
(74, 18507870, '18507870@serviciudad.com', '$2b$10$LddC2t0sSVntvy3Qo6FYOuGIVTq61ul1Tt7MdIyTRvYPK9rJ1iXAK', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:11:22', NULL),
(75, 18530289, '18530289@serviciudad.com', '$2b$10$/3DSfdGmTDgAy2Fn2wqxDu2zQcXHsv8ckH8Fd5EqFSIBPwdC230Hq', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:11:35', NULL),
(76, 10092442, '10092442@serviciudad.com', '$2b$10$XylQ0lXBLnllYxcwBM5m3uB3XwesdGvZwKX9/JzWPfhe5aGOsRVeS', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:11:46', NULL),
(77, 1088011977, '1088011977@serviciudad.com', '$2b$10$xKUtV3l2kVVmTWyIiMVEle/Ue3372nHNIUXXxmnTukdCgJFjycUaG', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:12:03', NULL),
(78, 1088243862, '1088243862@serviciudad.com', '$2b$10$BHJoMX4X0ASWNvYbwWleZuEqy6eOp6p5rvNURTBV/LbrrR6oPF2t6', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:12:19', NULL),
(79, 18506769, '18506769@serviciudad.com', '$2b$10$mCjMFBjwRPxns6Iv/Je0Iu0gN1D01NoHRtgZjjKMklyRVCe.VYB0i', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:12:31', NULL),
(80, 18505464, '18505464@serviciudad.com', '$2b$10$a7iO/wlejlh6UuF27jJQg.43RiiRvZVC1U28EbsRx0Mpt/BokPEDW', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:12:43', NULL),
(81, 1088027327, '1088027327@serviciudad.com', '$2b$10$9HB5hS2rLCjWf20mILy5YeLIkuIsLX11ELppgXWyGijn4.p7WbpwW', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:13:29', NULL),
(82, 1088032956, '1088032956@serviciudad.com', '$2b$10$J6SwhMWUjE8apEbm6BBieOwRy9FttPOx37D5gtOjQgfE7UCLJU4EW', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:13:43', NULL),
(83, 1088025224, '1088025224@serviciudad.com', '$2b$10$CDRHA7Di7tOeojj3bIfyP.T8e91pHPP/kzz83dCtzZNHC.DPmofjq', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:13:56', NULL),
(84, 10114866, '10114866@serviciudad.com', '$2b$10$dMqoeTanAQ5gZYencerOROUBhGs5rbSegd7qPCJTmYZU1T1beuufK', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:20:21', NULL),
(85, 1127912920, '1127912920@serviciudad.com', '$2b$10$t9yMZvqxyeVrOAeKwcvBiex3MIYe0CVA5nOaEudOC3SSEE6SNzE8S', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:20:37', NULL),
(86, 1088010700, '1088010700@serviciudad.com', '$2b$10$.Dh23WfUVndaZil5CR5RnePN0EIV147gwJgpsh2ZPoAc8lrvtGj7O', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:20:49', NULL),
(87, 10131787, '10131787@serviciudad.com', '$2b$10$2Ow/I1HDx.1irsq/v2w1RukGBcEyxoyLcCRfoyokme9OnXtqVrSk6', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:21:02', NULL),
(88, 18520322, '18520322@serviciudad.com', '$2b$10$eb7Tf/c3HI/lWcq54qRkJ.1SLUTj4TI.30K4eLxDmEC1Gct98oq8e', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:21:16', NULL),
(89, 1193111227, '1193111227@serviciudad.com', '$2b$10$JR973uWYBuH5PThkayvJX.TtFaGUU5dEv7UzqEVaWKu/rpYaDv1Yu', 'CONDUCTOR', 1, NULL, NULL, '2024-09-23 10:21:29', NULL),
(90, 1004670668, 'salazarjean2003@gmail.com', '$2b$10$4ZVHTQPKbSQFoWZO0ivAGu4tu05xcKy.hUN6xYbzOUwGnFa97bWpe', 'ADMIN', 1, NULL, NULL, '2024-09-24 08:34:05', '2024-09-24 15:45:07'),
(91, 1088262346, 'subplaneacion@serviciudad.gov.co', '$2b$10$.b695gdLoC.KmotfIp2GX.FACjG9FsuJzgvsk/JpM622YwNVSbL7C', 'CONDUCTOR', 1, NULL, NULL, '2024-09-24 08:48:34', NULL),
(92, 1089598294, 'yereny1104@gmail.com', '$2b$10$sZ74osScUxxg//IPZ8z92.HwpIUpcrwvwe48AjEHvBJZ7EUquUoUS', 'CONDUCTOR', 1, NULL, NULL, '2024-09-24 20:02:54', '2024-09-24 20:07:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicle`
--

CREATE TABLE `vehicle` (
  `vehicle_id` smallint(5) UNSIGNED NOT NULL,
  `license_plate` char(6) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `type` enum('RECOLECTOR','VOLQUETA','LIVIANO','CAMION','CAMIONETA','MOTO','OTRO') NOT NULL,
  `area` enum('ASEO','ACUEDUCTO','ALCANTARILLADO','OTRO') DEFAULT NULL,
  `soat_until` date NOT NULL,
  `rtm_until` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehicle`
--

INSERT INTO `vehicle` (`vehicle_id`, `license_plate`, `brand`, `type`, `area`, `soat_until`, `rtm_until`, `created_at`, `updated_at`) VALUES
(96, 'OCA054', 'CHREVOLET', 'VOLQUETA', 'ASEO', '2024-09-03', '2024-12-29', '2024-09-23 08:22:24', '2024-09-23 08:26:31'),
(97, 'OEY001', 'JAC', 'CAMION', 'ASEO', '2025-01-22', '2025-03-15', '2024-09-23 08:26:59', '2024-09-23 08:26:59'),
(98, 'OEY028', 'CHEVROLET', 'RECOLECTOR', 'ASEO', '2025-03-23', '2026-04-15', '2024-09-23 08:28:57', '2024-09-23 08:28:57'),
(99, 'OEY021', 'CHEVROLET', 'CAMION', 'ASEO', '2025-03-17', '2025-04-23', '2024-09-23 08:30:15', '2024-09-23 08:30:15'),
(100, 'OEY026', 'CHEVROLET', 'CAMION', 'ASEO', '2025-07-24', '2025-07-30', '2024-09-23 08:31:36', '2024-09-23 08:31:36'),
(101, 'OEY025', 'CHEVROLET', 'CAMION', 'ASEO', '2025-05-14', '2025-05-18', '2024-09-23 08:34:52', '2024-09-23 08:34:52'),
(102, 'OEY015', 'CHEVROLET', 'CAMION', 'ASEO', '2025-04-26', '2025-07-15', '2024-09-23 08:56:14', '2024-09-23 08:56:14'),
(103, 'OEY002', 'CHEVROLET', 'CAMION', 'ASEO', '2024-11-29', '2025-02-14', '2024-09-23 08:58:04', '2024-09-23 08:58:04'),
(104, 'OEY004', 'CHEVROLET', 'CAMION', 'ASEO', '2025-02-19', '2025-04-08', '2024-09-23 09:04:08', '2024-09-23 09:04:08'),
(105, 'OEY003', 'CHEVROLET', 'CAMION', 'ASEO', '2024-11-29', '2025-03-19', '2024-09-23 09:05:13', '2024-09-23 09:05:13'),
(106, 'OEY018', 'CHEVROLET', 'CAMION', 'ASEO', '2024-11-21', '2025-04-25', '2024-09-23 09:05:58', '2024-09-23 09:05:58'),
(107, 'OCA066', 'CHEVROLET- KODIAK', 'CAMION', 'ASEO', '2025-07-18', '2025-04-15', '2024-09-23 09:07:12', '2024-09-23 09:07:12'),
(108, 'OEY024', 'CHEVROLET', 'CAMION', 'ACUEDUCTO', '2025-05-14', '2025-05-18', '2024-09-23 09:07:58', '2024-09-23 09:07:58'),
(109, 'OEY023', 'CHEVROLET', 'CAMION', 'ALCANTARILLADO', '2025-06-14', '2025-06-14', '2024-09-23 09:09:00', '2024-09-23 09:09:00'),
(111, 'OEY022', 'CHEVROLET', 'RECOLECTOR', 'ASEO', '2025-03-08', '2025-04-23', '2024-09-23 09:10:50', '2024-09-23 09:10:50'),
(112, 'OCA091', 'CHEVROLET', 'CAMIONETA', 'ALCANTARILLADO', '2025-02-19', '2025-11-25', '2024-09-23 09:12:00', '2024-09-23 09:12:00'),
(113, 'OCA092', 'CHEVROLET', 'CAMIONETA', 'ACUEDUCTO', '2025-04-25', '2024-10-05', '2024-09-23 09:12:49', '2024-09-23 09:12:49'),
(114, 'OCA069', 'CHEVROLET - KODIAK', 'VOLQUETA', 'ALCANTARILLADO', '2025-01-19', '2024-10-19', '2024-09-23 09:13:36', '2024-09-23 09:13:36'),
(115, 'OEY009', 'DFSK', 'CAMIONETA', 'ASEO', '2025-04-22', '2025-04-27', '2024-09-23 09:14:13', '2024-09-23 09:14:13'),
(116, 'OCA083', 'CHEVROLET - KODIAK', 'CAMION', 'ASEO', '2025-03-08', '2024-12-02', '2024-09-23 09:14:53', '2024-09-23 09:14:53'),
(117, 'DQA894', 'MITSUBISHI', 'CAMIONETA', 'ACUEDUCTO', '2024-11-24', '2025-05-22', '2024-09-23 09:15:36', '2024-09-23 09:15:36'),
(118, 'OCA042', 'TOYOTA', 'CAMIONETA', 'ACUEDUCTO', '2022-12-07', '2025-03-02', '2024-09-23 09:16:41', '2024-09-23 09:17:03'),
(119, 'AQY82F', 'HONDA CB 160F DLX', 'MOTO', 'ACUEDUCTO', '2025-08-22', '2024-09-12', '2024-09-23 09:18:08', '2024-09-23 09:18:08'),
(120, 'RKQ43E', 'SUZUKI', 'MOTO', 'ACUEDUCTO', '2025-08-09', '2025-08-13', '2024-09-23 09:20:36', '2024-09-23 09:20:55'),
(121, 'RKQ44E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-07-31', '2024-11-24', '2024-09-23 09:21:47', '2024-09-23 09:21:47'),
(122, 'RKQ45E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-07-31', '2024-09-11', '2024-09-23 09:22:19', '2024-09-23 09:22:19'),
(123, 'RKQ46E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-07-31', '2024-09-23', '2024-09-23 09:23:12', '2024-09-23 09:23:12'),
(124, 'RKQ47E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-07-31', '2024-09-11', '2024-09-23 09:23:48', '2024-09-23 09:23:48'),
(125, 'RKQ48E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-07-31', '2024-11-12', '2024-09-23 09:24:26', '2024-09-23 09:24:26'),
(126, 'RKQ49E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-07-31', '2024-10-28', '2024-09-23 09:25:09', '2024-09-23 09:25:33'),
(127, 'SOV30C', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-05-11', '2024-09-08', '2024-09-23 09:26:23', '2024-09-23 09:26:23'),
(128, 'DMP25E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2024-09-26', '2024-11-14', '2024-09-23 09:27:03', '2024-09-23 09:27:03'),
(129, 'DMP47E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2024-09-26', '2024-10-23', '2024-09-23 09:27:44', '2024-09-23 09:27:44'),
(130, 'DMP65E', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2024-09-26', '2024-09-27', '2024-09-23 09:28:15', '2024-09-23 09:28:15'),
(131, 'SOV29C', 'SUZUKI AX4', 'MOTO', 'ACUEDUCTO', '2025-05-11', '2025-06-19', '2024-09-23 09:29:04', '2024-09-23 09:29:04'),
(132, 'SOP82', 'HONDA ECO 100', 'MOTO', 'ACUEDUCTO', '2024-01-17', '2023-08-23', '2024-09-23 09:29:44', '2024-09-23 09:29:44'),
(133, 'SOV25C', 'SUZUKI', 'MOTO', 'ACUEDUCTO', '2025-05-11', '2024-11-10', '2024-09-23 09:30:38', '2024-09-23 09:30:38'),
(134, 'SOV26C', 'SUZUKI', 'MOTO', 'ACUEDUCTO', '2025-05-11', '2024-09-11', '2024-09-23 09:31:25', '2024-09-23 09:31:25'),
(135, 'LDN73G', 'SUZUKI GN 125', 'MOTO', 'ACUEDUCTO', '2024-11-24', '2024-11-28', '2024-09-23 09:31:57', '2024-09-23 09:31:57'),
(136, 'LDQ27G', 'SUZUKI GN 125', 'MOTO', 'ACUEDUCTO', '2024-11-24', '2023-12-01', '2024-09-23 09:32:45', '2024-09-23 09:33:05'),
(137, 'LDN91G', 'SUZUKI DR150', 'MOTO', 'ACUEDUCTO', '2024-11-24', '2024-11-25', '2024-09-23 09:34:27', '2024-09-23 09:34:27'),
(138, 'LDN55G', 'SUZUKI GN 125', 'MOTO', 'ACUEDUCTO', '2024-11-24', '2024-11-25', '2024-09-23 09:35:27', '2024-09-23 09:35:27'),
(139, 'LDN74G', 'SUZUKI GN 125', 'MOTO', 'ASEO', '2024-11-24', '2024-11-28', '2024-09-23 09:43:58', '2024-09-23 09:43:58'),
(140, 'OEY031', 'CHEVROLET NHR', 'CAMIONETA', 'ACUEDUCTO', '2024-12-14', '2028-12-27', '2024-09-23 09:44:51', '2024-09-23 09:44:51'),
(141, 'OEY032', 'CHEVROLET FVZ', 'CAMION', 'ASEO', '2024-12-21', '2027-12-22', '2024-09-23 09:49:27', '2024-09-23 09:49:27'),
(142, 'OEY030', 'DAF LF280', 'CAMION', 'ACUEDUCTO', '2025-08-22', '2027-08-24', '2024-09-23 09:50:07', '2024-09-23 09:50:07'),
(143, 'LDQ28G', 'SUZUKI GN 125', 'MOTO', 'ASEO', '2024-11-24', '2024-11-25', '2024-09-23 09:53:33', '2024-09-23 09:53:33'),
(144, 'OEY036', 'CHEVROLET FVR', 'VOLQUETA', 'ASEO', '2024-10-13', '2028-10-17', '2024-09-23 09:54:17', '2024-09-23 09:54:17'),
(145, 'OEY043', 'FOTON', 'CAMION', 'ASEO', '2025-02-14', '2029-02-20', '2024-09-23 09:55:14', '2024-09-23 09:55:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicle_condition`
--

CREATE TABLE `vehicle_condition` (
  `condition_id` bigint(20) UNSIGNED NOT NULL,
  `inspection_id` int(10) UNSIGNED DEFAULT NULL,
  `conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`conditions`)),
  `comment` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driver_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `inspection`
--
ALTER TABLE `inspection`
  ADD PRIMARY KEY (`inspection_id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indices de la tabla `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`user_id`,`token`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD UNIQUE KEY `Placa` (`license_plate`);

--
-- Indices de la tabla `vehicle_condition`
--
ALTER TABLE `vehicle_condition`
  ADD PRIMARY KEY (`condition_id`),
  ADD KEY `inspection_id` (`inspection_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `driver`
--
ALTER TABLE `driver`
  MODIFY `driver_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;

--
-- AUTO_INCREMENT de la tabla `inspection`
--
ALTER TABLE `inspection`
  MODIFY `inspection_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `vehicle_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de la tabla `vehicle_condition`
--
ALTER TABLE `vehicle_condition`
  MODIFY `condition_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `driver`
--
ALTER TABLE `driver`
  ADD CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Filtros para la tabla `inspection`
--
ALTER TABLE `inspection`
  ADD CONSTRAINT `inspection_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`),
  ADD CONSTRAINT `inspection_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`);

--
-- Filtros para la tabla `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Filtros para la tabla `vehicle_condition`
--
ALTER TABLE `vehicle_condition`
  ADD CONSTRAINT `vehicle_condition_ibfk_1` FOREIGN KEY (`inspection_id`) REFERENCES `inspection` (`inspection_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
