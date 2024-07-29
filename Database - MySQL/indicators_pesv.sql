-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-07-2024 a las 22:29:05
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
  `nombre` varchar(100) NOT NULL,
  `frecuencia` enum('anual','semestral','trimestral','mensual') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `indicadores`
--

INSERT INTO `indicadores` (`id_indicador`, `nombre`, `frecuencia`) VALUES
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
(11, 'Cobertura Plan de formación en seguridad vial CPFSV', 'anual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_indicadores`
--

CREATE TABLE `registro_indicadores` (
  `id_registro` int(10) UNSIGNED NOT NULL,
  `indicador_id` int(10) UNSIGNED NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `periodo_inicio` date NOT NULL,
  `periodo_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_indicadores`
--

INSERT INTO `registro_indicadores` (`id_registro`, `indicador_id`, `valor`, `periodo_inicio`, `periodo_fin`) VALUES
(1, 1, 8.87, '2024-01-01', '2024-12-31'),
(2, 2, -4.00, '2024-01-01', '2024-12-31'),
(3, 3, 2.00, '2024-01-01', '2024-12-31'),
(4, 4, 82.61, '2024-01-01', '2024-06-30'),
(5, 5, 0.00, '2024-01-01', '2024-06-30'),
(6, 6, 44.44, '2024-01-01', '2024-06-30'),
(7, 7, 0.59, '2024-01-01', '2024-01-31'),
(8, 8, 46.81, '2024-01-01', '2024-01-31'),
(9, 9, 58.82, '2024-01-01', '2024-03-31'),
(10, 10, 100.00, '2024-01-01', '2024-12-31'),
(11, 11, 63.19, '2024-01-01', '2024-12-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor_variables`
--

CREATE TABLE `valor_variables` (
  `id_valor` int(10) UNSIGNED NOT NULL,
  `indicador_id` int(10) UNSIGNED NOT NULL,
  `variable_id` int(10) UNSIGNED NOT NULL,
  `valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valor_variables`
--

INSERT INTO `valor_variables` (`id_valor`, `indicador_id`, `variable_id`, `valor`) VALUES
(1, 1, 1, 10.00),
(2, 1, 2, 1000000.00),
(3, 1, 3, 1128000.00),
(4, 2, 4, 22.00),
(5, 2, 5, 26.00),
(6, 3, 6, 4.00),
(7, 3, 7, 6.00),
(8, 4, 8, 19.00),
(9, 4, 9, 23.00),
(10, 5, 10, 0.00),
(11, 5, 11, 0.00),
(12, 6, 12, 20.00),
(13, 6, 13, 45.00),
(14, 7, 14, 4.00),
(15, 8, 15, 680.00),
(16, 8, 16, 22.00),
(17, 8, 17, 47.00),
(18, 9, 18, 20.00),
(19, 9, 19, 34.00),
(20, 10, 20, 5.00),
(21, 10, 21, 5.00),
(22, 11, 22, 206.00),
(23, 11, 23, 326.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variables`
--

CREATE TABLE `variables` (
  `id_variable` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variables`
--

INSERT INTO `variables` (`id_variable`, `nombre`, `codigo`, `descripcion`) VALUES
(1, 'Siniestros Viales', 'SV', 'Número de siniestros viales en el período (fatal, heridos, leves, graves, choques simples)'),
(2, 'Constante K', 'K', 'Constante de 1,000,000 Km'),
(3, 'Cantidad de Kilómetros', 'KM', 'Número de kilómetros recorridos por período, promedio de toda la flota'),
(4, 'Riesgos Identificados (Inicio Año)', 'RI(ia)', 'Cantidad de riesgos identificados al inicio del año'),
(5, 'Riesgos Identificados (Fin Año)', 'RI(fa)', 'Cantidad de riesgos identificados al final del año'),
(6, 'Riesgos Viales Alto Valor (Inicio Año)', 'RVA(ia)', 'Cantidad de riesgos viales de alto valor identificados al inicio del año'),
(7, 'Riesgos Viales Alto Valor (Fin Año)', 'RVA(fa)', 'Cantidad de riesgos viales de alto valor identificados al final del año'),
(8, 'Metas Alcanzadas', 'MA', 'Número de metas alcanzadas o logradas en el PESV por período'),
(9, 'Total Metas Proyectadas', 'TM', 'Total de metas proyectadas'),
(10, 'Actividades Ejecutadas Plan', 'AEPlan', 'Número de actividades ejecutadas en el plan anual de trabajo por semestre'),
(11, 'Actividades Programadas Plan', 'APPlan', 'Número total de actividades programadas en el plan anual de trabajo PESV por semestre'),
(12, 'Vehículos Incluidos Programa', '#VIP', 'Número de vehículos incluidos en el programa de gestión de la velocidad (propios, terceros o contratados) utilizados permanentemente'),
(13, 'Vehículos Desplazamientos Mes', '#VDL', 'Número de vehículos utilizados para desplazamientos por mes'),
(14, 'Desplazamientos Laborales Exceso Velocidad', '#DLEV', 'Número diario de desplazamientos laborales con exceso de velocidad (casos en los que se superó el límite definido por la empresa) por mes'),
(15, 'Total Desplazamientos Laborales', '#TDL', 'Número total de desplazamientos laborales por mes'),
(16, 'Vehículos Inspeccionados Diariamente', '#VID', 'Número de vehículos inspeccionados diariamente'),
(17, 'Vehículos Trabajando Diariamente', '#TV', 'Número de vehículos que trabajan diariamente'),
(18, 'Mantenimiento Ejecutado', 'MEV', 'Número de actividades de mantenimiento preventivo ejecutadas por trimestre'),
(19, 'Mantenimiento Programado', 'MPV', 'Número total de actividades de mantenimiento preventivo programadas por trimestre'),
(20, 'Capacitaciones Seguridad Vial Ejecutadas', 'CESV', 'Número de capacitaciones en seguridad vial ejecutadas en el período'),
(21, 'Capacitaciones Seguridad Vial Programadas', 'CPSV', 'Número de capacitaciones programadas en seguridad vial'),
(22, 'Colaboradores Capacitados Seguridad Vial', 'NCCSV', 'Número de colaboradores capacitados en seguridad vial'),
(23, 'Colaboradores Totales', 'CT', 'Número total de colaboradores de la empresa');

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
  ADD PRIMARY KEY (`id_variable`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `indicadores`
--
ALTER TABLE `indicadores`
  MODIFY `id_indicador` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `registro_indicadores`
--
ALTER TABLE `registro_indicadores`
  MODIFY `id_registro` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `valor_variables`
--
ALTER TABLE `valor_variables`
  MODIFY `id_valor` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `variables`
--
ALTER TABLE `variables`
  MODIFY `id_variable` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
