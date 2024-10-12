-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2024 a las 18:39:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `indicators_pesv`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `indicadores`
--

CREATE TABLE `indicadores` (
  `id_indicador` int(10) UNSIGNED NOT NULL,
  `nombre_indicador` varchar(100) NOT NULL,
  `frecuencia` enum('anual','semestral','trimestral','mensual') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `indicadores`
--

INSERT INTO `indicadores` (`id_indicador`, `nombre_indicador`, `frecuencia`) VALUES
(1, 'Indicador Siniestros Viales TSV', 'anual'),
(2, 'Riesgos de seguridad vial identificados RSVI', 'anual'),
(3, 'Gestion de Riesgos Viales GRV', 'anual'),
(4, 'Cumplimiento de metas CMPESV', 'anual'),
(5, 'Cumplimiento de actividades plan anual PESV', 'semestral'),
(6, 'Cobertura programa de gestion Velocidad Empresarial GVE', 'semestral'),
(7, 'Excesos Límite de velocidad ELVL', 'mensual'),
(8, 'Inspecciones Diarias preoperacionales IDP', 'mensual'),
(9, 'Cumplimiento plan de mantenimiento preventivo de vehículos CPMPV', 'trimestral'),
(10, 'Cumplimiento Plan de formación en seguridad vial CPFSV', 'anual'),
(11, 'Cobertura Plan de formación en seguridad vial CPFSV', 'anual'),
(12, 'Costo Siniestros Viales Por Nivel De Perdida', 'trimestral'),
(13, 'No conformidades auditorias Cerradas\r\n', 'anual'),
(14, 'Exceso de jornadas laborales\r\n', 'mensual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_indicadores`
--

CREATE TABLE `registro_indicadores` (
  `id_registro` int(10) UNSIGNED NOT NULL,
  `indicador_id` int(10) UNSIGNED NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `periodo_inicio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_indicadores`
--

INSERT INTO `registro_indicadores` (`id_registro`, `indicador_id`, `valor`, `periodo_inicio`) VALUES
(34, 1, 12.00, '2024-04-18'),
(35, 1, 12.00, '2024-05-29'),
(36, 1, 13.00, '2024-06-18'),
(37, 1, 23.00, '2024-07-17'),
(38, 1, 22.00, '2024-08-13'),
(39, 1, 21.00, '2024-09-12'),
(40, 1, 12.00, '2024-10-10'),
(41, 1, 20.00, '2024-11-12'),
(42, 1, 12.00, '2024-12-09'),
(44, 2, 11.00, '2025-01-30'),
(45, 2, 11.00, '2023-01-30'),
(46, 2, 11.00, '2026-01-28'),
(47, 1, 12.00, '2024-02-15'),
(49, 2, 119.00, '2020-01-02'),
(54, 5, 107.32, '2024-12-12'),
(56, 1, 12.00, '2024-01-01'),
(57, 1, 12.00, '2024-03-01'),
(58, 1, 12.00, '2025-01-01'),
(59, 13, 100.00, '2024-01-10'),
(60, 11, 100.00, '2025-01-02'),
(61, 13, 100.00, '2026-01-01'),
(62, 11, 100.00, '2026-01-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor_variables`
--

CREATE TABLE `valor_variables` (
  `id_valor` int(10) UNSIGNED NOT NULL,
  `indicador_id` int(10) UNSIGNED NOT NULL,
  `variable_id` int(10) UNSIGNED NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `periodo` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valor_variables`
--

INSERT INTO `valor_variables` (`id_valor`, `indicador_id`, `variable_id`, `valor`, `periodo`) VALUES
(1, 1, 1, 121.00, '2025-01-01'),
(2, 1, 2, 12.00, '2025-01-01'),
(3, 1, 3, 10.00, '2025-01-01'),
(4, 1, 1, 12.00, '2026-01-01'),
(5, 1, 2, 12.00, '2026-01-01'),
(6, 1, 3, 12.00, '2026-01-01'),
(7, 1, 1, 12.00, '2027-01-01'),
(8, 1, 2, 12.00, '2027-01-01'),
(9, 1, 3, 12.00, '2027-01-01'),
(10, 1, 1, 12.00, '2024-01-01'),
(11, 1, 2, 12.00, '2024-01-01'),
(12, 1, 3, 12.00, '2024-01-01'),
(13, 1, 1, 12.00, '2024-01-01'),
(14, 1, 2, 12.00, '2024-01-01'),
(15, 1, 3, 12.00, '2024-01-01'),
(16, 1, 1, 12.00, '2025-01-01'),
(17, 1, 2, 12.00, '2025-01-01'),
(18, 1, 3, 12.00, '2025-01-01'),
(19, 1, 1, 12.00, '2026-01-01'),
(20, 1, 2, 12.00, '2026-01-01'),
(21, 1, 3, 12.00, '2026-01-01'),
(22, 1, 1, 12.00, '2023-01-01'),
(23, 1, 3, 12.00, '2023-01-01'),
(24, 1, 2, 12.00, '2023-01-01'),
(25, 1, 1, 12.00, '2024-01-01'),
(26, 1, 2, 12.00, '2024-01-01'),
(27, 1, 3, 12.00, '2024-01-01'),
(28, 1, 1, 1.00, '2024-01-26'),
(29, 1, 2, 12.00, '2024-01-26'),
(30, 1, 3, 10.00, '2024-01-26'),
(31, 1, 1, 12.00, '2024-07-31'),
(32, 1, 2, 12.00, '2024-07-31'),
(33, 1, 3, 12.00, '2024-07-31'),
(34, 1, 1, 12.00, '2024-08-01'),
(35, 1, 2, 12.00, '2024-08-01'),
(36, 1, 3, 12.00, '2024-08-01'),
(37, 1, 1, 12.00, '2024-09-03'),
(38, 1, 2, 100.00, '2024-09-03'),
(39, 1, 3, 1.00, '2024-09-03'),
(40, 1, 1, 12.00, '2024-10-08'),
(41, 1, 2, 1.00, '2024-10-08'),
(42, 1, 3, 1.00, '2024-10-08'),
(43, 1, 1, 12.00, '2024-11-11'),
(44, 1, 2, 1.00, '2024-11-11'),
(45, 1, 3, 1.00, '2024-11-11'),
(46, 1, 1, 12.00, '2024-01-09'),
(47, 1, 2, 12.00, '2024-01-09'),
(48, 1, 3, 12.00, '2024-01-09'),
(49, 1, 1, 12.00, '2025-01-07'),
(50, 1, 2, 12.00, '2025-01-07'),
(51, 1, 3, 12.00, '2025-01-07'),
(52, 1, 1, 12.00, '2026-01-06'),
(53, 1, 2, 12.00, '2026-01-06'),
(54, 1, 3, 12.00, '2026-01-06'),
(55, 1, 1, 12.00, '2027-01-01'),
(56, 1, 2, 12.00, '2027-01-01'),
(57, 1, 3, 12.00, '2027-01-01'),
(58, 1, 1, 12.00, '2024-01-01'),
(59, 1, 2, 12.00, '2024-01-01'),
(60, 1, 3, 12.00, '2024-01-01'),
(61, 1, 1, 12.00, '2021-01-01'),
(62, 1, 2, 12.00, '2021-01-01'),
(63, 1, 3, 12.00, '2021-01-01'),
(64, 1, 1, 12.00, '2020-01-01'),
(65, 1, 2, 12.00, '2020-01-01'),
(66, 1, 3, 12.00, '2020-01-01'),
(67, 2, 4, 12.00, '2024-01-01'),
(68, 2, 5, 1.00, '2024-01-01'),
(69, 1, 1, 12.00, '2024-02-22'),
(70, 1, 2, 12.00, '2024-02-22'),
(71, 1, 3, 12.00, '2024-02-22'),
(72, 1, 1, 12.00, '2024-03-14'),
(73, 1, 2, 12.00, '2024-03-14'),
(74, 1, 3, 12.00, '2024-03-14'),
(75, 1, 1, 12.00, '2024-04-10'),
(76, 1, 2, 12.00, '2024-04-10'),
(77, 1, 3, 12.00, '2024-04-10'),
(78, 1, 1, 12.00, '2024-05-29'),
(79, 1, 2, 12.00, '2024-05-29'),
(80, 1, 3, 12.00, '2024-05-29'),
(81, 1, 1, 1.00, '2024-06-20'),
(82, 1, 2, 1.00, '2024-06-20'),
(83, 1, 3, 1.00, '2024-06-20'),
(84, 1, 1, 121.00, '2024-07-31'),
(85, 1, 2, 1.00, '2024-07-31'),
(86, 1, 3, 12.00, '2024-07-31'),
(87, 1, 1, 12.00, '2024-09-06'),
(88, 1, 2, 12.00, '2024-09-06'),
(89, 1, 3, 12.00, '2024-09-06'),
(90, 1, 1, 12.00, '2024-01-01'),
(91, 1, 2, 1.00, '2024-01-01'),
(92, 1, 3, 1.00, '2024-01-01'),
(93, 1, 1, 33.00, '2024-02-01'),
(94, 1, 2, 33.00, '2024-02-01'),
(95, 1, 3, 29.00, '2024-02-01'),
(96, 1, 1, 12.00, '2024-03-30'),
(97, 1, 2, 12.00, '2024-03-30'),
(98, 1, 3, 12.00, '2024-03-30'),
(99, 1, 1, 13.00, '2024-04-18'),
(100, 1, 2, 13.00, '2024-04-18'),
(101, 1, 3, 13.00, '2024-04-18'),
(102, 1, 1, 12.00, '2024-05-29'),
(103, 1, 2, 12.00, '2024-05-29'),
(104, 1, 3, 12.00, '2024-05-29'),
(105, 1, 1, 13.00, '2024-06-18'),
(106, 1, 2, 12.00, '2024-06-18'),
(107, 1, 3, 12.00, '2024-06-18'),
(108, 1, 1, 23.00, '2024-07-17'),
(109, 1, 2, 23.00, '2024-07-17'),
(110, 1, 3, 23.00, '2024-07-17'),
(111, 1, 1, 22.00, '2024-08-13'),
(112, 1, 2, 22.00, '2024-08-13'),
(113, 1, 3, 22.00, '2024-08-13'),
(114, 1, 1, 21.00, '2024-09-12'),
(115, 1, 2, 23.00, '2024-09-12'),
(116, 1, 3, 23.00, '2024-09-12'),
(117, 1, 1, 12.00, '2024-10-10'),
(118, 1, 2, 12.00, '2024-10-10'),
(119, 1, 3, 12.00, '2024-10-10'),
(120, 1, 1, 20.00, '2024-11-12'),
(121, 1, 2, 21.00, '2024-11-12'),
(122, 1, 3, 21.00, '2024-11-12'),
(123, 1, 1, 12.00, '2024-12-09'),
(124, 1, 2, 12.00, '2024-12-09'),
(125, 1, 3, 12.00, '2024-12-09'),
(126, 2, 4, 12.00, '2024-01-16'),
(127, 2, 5, 1.00, '2024-01-16'),
(128, 2, 4, 12.00, '2025-01-30'),
(129, 2, 5, 1.00, '2025-01-30'),
(130, 2, 4, 12.00, '2023-01-30'),
(131, 2, 5, 1.00, '2023-01-30'),
(132, 2, 4, 12.00, '2026-01-28'),
(133, 2, 5, 1.00, '2026-01-28'),
(134, 1, 1, 12.00, '2024-02-15'),
(135, 1, 2, 12.00, '2024-02-15'),
(136, 1, 3, 12.00, '2024-02-15'),
(137, 1, 1, 12.00, '2026-04-01'),
(138, 1, 2, 12.00, '2026-04-01'),
(139, 1, 3, 12.00, '2026-04-01'),
(140, 2, 4, 121.00, '2020-01-02'),
(141, 2, 5, 2.00, '2020-01-02'),
(142, 5, 10, 12.00, '2024-06-01'),
(143, 5, 11, 11.00, '2024-06-01'),
(144, 5, 10, 100.00, '2024-12-01'),
(145, 5, 11, 100.00, '2024-12-01'),
(146, 4, 8, 12.00, '2024-06-06'),
(147, 4, 9, 12.00, '2024-06-06'),
(148, 4, 8, 12.00, '2024-12-12'),
(149, 4, 9, 12.00, '2024-12-12'),
(150, 5, 10, 132.00, '2024-12-12'),
(151, 5, 11, 123.00, '2024-12-12'),
(152, 2, 4, 12.00, '2024-01-05'),
(153, 2, 5, 1.00, '2024-01-05'),
(154, 1, 1, 12.00, '2024-01-01'),
(155, 1, 2, 12.00, '2024-01-01'),
(156, 1, 3, 12.00, '2024-01-01'),
(157, 1, 1, 12.00, '2024-03-01'),
(158, 1, 2, 12.00, '2024-03-01'),
(159, 1, 3, 12.00, '2024-03-01'),
(160, 1, 1, 12.00, '2025-01-01'),
(161, 1, 2, 12.00, '2025-01-01'),
(162, 1, 3, 12.00, '2025-01-01'),
(163, 13, 26, 12.00, '2024-01-10'),
(164, 13, 27, 12.00, '2024-01-10'),
(165, 11, 22, 12.00, '2025-01-02'),
(166, 11, 23, 12.00, '2025-01-02'),
(167, 13, 26, 12.00, '2026-01-01'),
(168, 13, 27, 12.00, '2026-01-01'),
(169, 11, 22, 12.00, '2026-01-02'),
(170, 11, 23, 12.00, '2026-01-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variables`
--

CREATE TABLE `variables` (
  `id_variable` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_indicador` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variables`
--

INSERT INTO `variables` (`id_variable`, `nombre`, `id_indicador`) VALUES
(1, 'Siniestros Viales', 1),
(2, 'Constante K', 1),
(3, 'Cantidad de Kilómetros', 1),
(4, 'Riesgos Identificados (Inicio Año)', 2),
(5, 'Riesgos Identificados (Fin Año)', 2),
(6, 'Riesgos Viales Alto Valor (Inicio Año)', 3),
(7, 'Riesgos Viales Alto Valor (Fin Año)', 3),
(8, 'Metas Alcanzadas', 4),
(9, 'Total Metas Proyectadas', 4),
(10, 'Actividades Ejecutadas Plan de Trabajo', 5),
(11, 'Actividades Programadas Plan de Trabajo', 5),
(12, 'Vehículos Incluidos Programa de Gestion', 6),
(13, 'Vehículos Desplazamientos Mes', 6),
(14, 'Desplazamientos Laborales Exceso Velocidad', 7),
(15, 'Total Desplazamientos Laborales', 7),
(16, 'Vehículos Inspeccionados Diariamente', 8),
(17, 'Vehículos Trabajando Diariamente', 8),
(18, 'Mantenimiento Ejecutado', 9),
(19, 'Mantenimiento Programado', 9),
(20, 'Capacitaciones Seguridad Vial Ejecutadas', 10),
(21, 'Capacitaciones Seguridad Vial Programadas', 10),
(22, 'Colaboradores Capacitados Seguridad Vial', 11),
(23, 'Colaboradores Totales', 11),
(24, 'Costos Directos Siniestros Viales ', 12),
(25, 'Costos Indirectos Siniestros Viales', 12),
(26, 'Numero De Conformidades Identificadas', 13),
(27, 'Numero Conformidades Gestionadas y Cerradas', 13),
(28, 'Numero De Dias Excedidos Al Mes', 14),
(29, 'Total De Dias Trabajados Al Mes', 14);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `indicadores`
--
ALTER TABLE `indicadores`
  ADD PRIMARY KEY (`id_indicador`);

--
-- Indices de la tabla `registro_indicadores`
--
ALTER TABLE `registro_indicadores`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `indicador_id` (`indicador_id`);

--
-- Indices de la tabla `valor_variables`
--
ALTER TABLE `valor_variables`
  ADD PRIMARY KEY (`id_valor`),
  ADD KEY `indicador_id` (`indicador_id`),
  ADD KEY `variable_id` (`variable_id`);

--
-- Indices de la tabla `variables`
--
ALTER TABLE `variables`
  ADD PRIMARY KEY (`id_variable`),
  ADD KEY `fk_indicador` (`id_indicador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `indicadores`
--
ALTER TABLE `indicadores`
  MODIFY `id_indicador` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `registro_indicadores`
--
ALTER TABLE `registro_indicadores`
  MODIFY `id_registro` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `valor_variables`
--
ALTER TABLE `valor_variables`
  MODIFY `id_valor` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT de la tabla `variables`
--
ALTER TABLE `variables`
  MODIFY `id_variable` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registro_indicadores`
--
ALTER TABLE `registro_indicadores`
  ADD CONSTRAINT `registro_indicadores_ibfk_1` FOREIGN KEY (`indicador_id`) REFERENCES `indicadores` (`id_indicador`);

--
-- Filtros para la tabla `valor_variables`
--
ALTER TABLE `valor_variables`
  ADD CONSTRAINT `valor_variables_ibfk_1` FOREIGN KEY (`indicador_id`) REFERENCES `indicadores` (`id_indicador`),
  ADD CONSTRAINT `valor_variables_ibfk_2` FOREIGN KEY (`variable_id`) REFERENCES `variables` (`id_variable`);

--
-- Filtros para la tabla `variables`
--
ALTER TABLE `variables`
  ADD CONSTRAINT `fk_indicador` FOREIGN KEY (`id_indicador`) REFERENCES `indicadores` (`id_indicador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
