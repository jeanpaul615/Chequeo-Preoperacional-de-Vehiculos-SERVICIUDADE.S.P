-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 02:11:40
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
(1, 1, 'Jean Paul Puerta Salazar', '2024-12-17', '2024-08-14 13:23:33', '2024-08-28 11:24:31'),
(6, 2, 'Jean Paul Puerta Salazar', '2024-08-08', '2024-08-20 15:12:44', '2024-08-27 10:45:59'),
(7, 10, 'Jean Paul Puerta Salazar ', '2024-08-05', '2024-08-27 10:40:01', NULL),
(15, 29, 'Jean Paul Puerta Salazar ', '2024-08-30', '2024-08-28 13:11:54', NULL),
(16, 18, 'Jean Paul Puerta Salazar ', '2024-08-22', '2024-08-28 13:12:04', NULL),
(17, 17, 'Jean Paul Puerta Salazar ', '2024-08-22', '2024-08-28 13:12:16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inspection`
--

CREATE TABLE `inspection` (
  `inspection_id` int(10) UNSIGNED NOT NULL,
  `driver_id` smallint(5) UNSIGNED NOT NULL,
  `vehicle_id` smallint(5) UNSIGNED DEFAULT NULL,
  `mileage` int(10) UNSIGNED NOT NULL,
  `comment` text DEFAULT NULL,
  `checked_by` varchar(40) DEFAULT NULL,
  `audited_by` varchar(40) DEFAULT NULL,
  `is_checked` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inspection`
--

INSERT INTO `inspection` (`inspection_id`, `driver_id`, `vehicle_id`, `mileage`, `comment`, `checked_by`, `audited_by`, `is_checked`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 413241, 'Nothing', NULL, NULL, 0, '2024-08-14 13:23:53', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parameter`
--

CREATE TABLE `parameter` (
  `parameter_id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` enum('NIVELES','INSTRUMENTOS','VIDRIOS','LUCES','REVISION INTERNA','OTROS','LLANTAS','VIAL','COMPACTADOR','CONDUCTOR') NOT NULL,
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
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `cedula`, `email`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 1004670668, 'salazarjean2003@gmail.com', '$2b$10$UXGKhaWtUX9hAPD48F37Hey5AptV3wt/r2weFl35yDFn6dhdldK/6', 'ADMIN', 1, '2024-08-14 10:50:57', '2024-08-28 11:26:32'),
(2, 1279247323, 'salazarjean2004@gmail.com', '$2b$10$UXGKhaWtUX9hAPD48F37Hey5AptV3wt/r2weFl35yDFn6dhdldK/6', 'CONDUCTOR', 0, '2024-08-20 13:58:11', '2024-08-28 11:51:12'),
(10, 186535111, 'salazarjean2002@gmail.com', '$2b$10$rd70F1f.NlBWCyBreG.OYeXHWlQ/VaTFT4v/q1ZNLlqmZTUZHQIfi', 'CONDUCTOR', 0, '2024-08-27 08:31:11', '2024-08-28 11:51:08'),
(13, 2147483647, 'jeanpaul2003@live.com', '$2b$10$cWPRXREWJUsPChIvDS4tq.IIU5o9f.8YisyXzkKMhDPan1FCw6HdK', 'CONDUCTOR', 1, '2024-08-28 12:35:13', NULL),
(17, 231333234, 'sahyan.munoz@utp.edu.co', '$2b$10$LByuOmvA9nbf6JzG73h2s.xpodKbk5/TmZWe4dtrjCFqvfOn1FbEa', 'CONDUCTOR', 1, '2024-08-28 12:52:23', NULL),
(18, 31231312, '23131@gmail.com', '$2b$10$aIWhm4nGS8KM0JcrPAnF3.3T9PXN3WdUMuEIiu8PTyzqLLE4PcBOi', 'CONDUCTOR', 1, '2024-08-28 12:52:59', NULL),
(29, 21218, 'estadistica@serviciudad.gov.co', '$2b$10$mF3KhKFds7.thHECCAcTMeGtWpaVx2cTdaTjNEUC4pEfH/OF.64p6', 'CONDUCTOR', 1, '2024-08-28 12:56:35', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicle`
--

CREATE TABLE `vehicle` (
  `vehicle_id` smallint(5) UNSIGNED NOT NULL,
  `type` enum('RECOLECTOR','VOLQUETA','LIVIANO','OTRO') NOT NULL,
  `license_plate` char(6) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `area` enum('ASEO','ACUEDUCTO','ALCANTARILLADO','OTRO') DEFAULT NULL,
  `soat_until` date NOT NULL,
  `rtm_until` date NOT NULL,
  `seguro_contractual_until` date NOT NULL,
  `seguro_extracontractual_until` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehicle`
--

INSERT INTO `vehicle` (`vehicle_id`, `type`, `license_plate`, `brand`, `area`, `soat_until`, `rtm_until`, `seguro_contractual_until`, `seguro_extracontractual_until`, `created_at`, `updated_at`) VALUES
(1, 'VOLQUETA', 'ABC012', 'Chrevolet', 'ALCANTARILLADO', '2024-08-05', '2024-08-05', '2024-08-05', '2024-08-05', '2024-08-14 12:19:14', '2024-08-28 15:36:40'),
(5, 'VOLQUETA', 'ABC215', 'CHEVROLET', 'ASEO', '2023-02-02', '2023-02-02', '2023-02-02', '2023-02-02', '2024-08-28 14:49:55', '2024-08-28 14:49:55'),
(7, 'RECOLECTOR', 'ABC612', 'Chrevolet', 'ASEO', '2024-08-22', '2024-08-27', '2024-08-16', '2024-08-27', '2024-08-28 14:59:38', '2024-08-28 14:59:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicle_condition`
--

CREATE TABLE `vehicle_condition` (
  `condition_id` bigint(20) UNSIGNED NOT NULL,
  `inspection_id` int(10) UNSIGNED DEFAULT NULL,
  `parameter_id` smallint(5) UNSIGNED DEFAULT NULL,
  `condition` enum('BIEN','MAL','NO APLICA') DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehicle_condition`
--

INSERT INTO `vehicle_condition` (`condition_id`, `inspection_id`, `parameter_id`, `condition`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'BIEN', '2024-08-14 13:24:32', NULL);

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
-- Indices de la tabla `parameter`
--
ALTER TABLE `parameter`
  ADD PRIMARY KEY (`parameter_id`);

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
  ADD KEY `inspection_id` (`inspection_id`),
  ADD KEY `parameter_id` (`parameter_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `driver`
--
ALTER TABLE `driver`
  MODIFY `driver_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `inspection`
--
ALTER TABLE `inspection`
  MODIFY `inspection_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `parameter`
--
ALTER TABLE `parameter`
  MODIFY `parameter_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `vehicle_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `vehicle_condition`
--
ALTER TABLE `vehicle_condition`
  MODIFY `condition_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `vehicle_condition_ibfk_1` FOREIGN KEY (`inspection_id`) REFERENCES `inspection` (`inspection_id`),
  ADD CONSTRAINT `vehicle_condition_ibfk_2` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`parameter_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
