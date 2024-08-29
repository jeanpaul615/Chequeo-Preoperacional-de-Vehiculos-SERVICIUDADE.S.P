-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 02:11:48
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
(4, 'Cumplimiento de metas CMPESV', 'semestral'),
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
(17, 1, 10.00, '2025-01-07'),
(18, 1, 10.00, '2026-01-06'),
(19, 1, 10.00, '2027-01-01'),
(20, 1, 10.00, '2024-01-01'),
(21, 1, 10.00, '2021-01-01'),
(22, 1, 12.00, '2020-01-01');

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
(66, 1, 3, 12.00, '2020-01-01');

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
  MODIFY `id_registro` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `valor_variables`
--
ALTER TABLE `valor_variables`
  MODIFY `id_valor` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

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
