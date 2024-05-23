-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2024 a las 19:04:34
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
-- Base de datos: `dreamhouse_v4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `category_id` int(10) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_image`) VALUES
(1, 'Pool', 'view/img/category_img/pool.png'),
(2, 'Garden', 'view/img/category_img/garden.png'),
(3, 'Storeroom', 'view/img/category_img/storeroom.png'),
(4, 'Heating', 'view/img/category_img/heating.jpg'),
(5, 'Gallery', 'view/img/category_img/gallery.jpg'),
(6, 'Dressing_room', 'view/img/category_img/dressing_room.png'),
(7, 'Hot_tub', 'view/img/category_img/hot_tub.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `city_id` int(10) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `city_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`city_id`, `city_name`, `city_image`) VALUES
(1, 'Valencia', 'view/img/city_img/valencia.jpg'),
(2, 'Alicante', 'view/img/city_img/alicante.jpg'),
(3, 'Castellon', 'view/img/city_img/castellon.jpg'),
(4, 'Madrid', 'view/img/city_img/madrid.jpg'),
(5, 'Barcelona', 'view/img/city_img/barcelona.jpg'),
(6, 'Sevilla', 'view/img/city_img/sevilla.jpg'),
(7, 'Granada', 'view/img/city_img/granada.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exceptions`
--

CREATE TABLE `exceptions` (
  `error_id` int(10) NOT NULL,
  `current_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `house`
--

CREATE TABLE `house` (
  `house_id` int(10) NOT NULL,
  `ref_cat` varchar(100) NOT NULL,
  `surface` varchar(100) NOT NULL,
  `num_rooms` varchar(100) NOT NULL,
  `num_wcs` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `city_id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `lng` varchar(20) DEFAULT NULL,
  `lat` varchar(20) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `house`
--

INSERT INTO `house` (`house_id`, `ref_cat`, `surface`, `num_rooms`, `num_wcs`, `price`, `city_id`, `pet_id`, `lng`, `lat`, `likes`) VALUES
(1, 'ABC-123', '200sqm', '3', '2', '200000', 1, 1, '-0.163754', '39.350387', 1),
(2, 'DEF-456', '140sqm', '4', '2', '250000', 2, 2, '-0.19722', '38.495334', 1),
(3, 'CBA-245', '88sqm', '2', '1', '150000', 3, 3, '-0.05', '40.031394', 1),
(4, 'GTQ-846', '150sqm', '5', '3', '300000', 4, 4, '-3.824652', '40.644406', 0),
(5, 'GLE-567', '105sqm', '3', '1', '180000', 5, 5, '2.180775', '41.279869', 0),
(6, 'XYZ-789', '180sqm', '4', '3', '280000', 7, 2, '-3.598557', '37.177336', 0),
(7, 'LMN-456', '120sqm', '3', '2', '220000', 6, 1, '-5.532825', '37.051456', 0),
(8, 'OQL-720', '200sqm', '5', '4', '350000', 1, 3, '-0.101304', '39.28331', 0),
(9, 'MEN-489', '150sqm', '4', '3', '280000', 2, 4, '-0.294827', '38.521622', 0),
(10, 'GHI-789', '180sqm', '4', '3', '320000', 3, 5, '-0.05', '39.97416', 0),
(11, 'JKL-012', '220sqm', '6', '4', '420000', 4, 1, '-3.825383', '40.420265', 1),
(12, 'MNO-345', '130sqm', '3', '2', '250000', 5, 2, '2.178356', '41.316204', 0),
(13, 'PQR-678', '180sqm', '4', '3', '320000', 1, 3, '-0.150987', '39.429409', 1),
(14, 'STU-901', '160sqm', '4', '3', '290000', 2, 4, '-0.12673', '38.552803', 0),
(15, 'VWX-234', '190sqm', '5', '4', '360000', 3, 5, '-0.05', '39.826494', 0),
(16, 'YZA-567', '200sqm', '6', '4', '400000', 4, 1, '-3.760404', '40.68538', 0),
(17, 'BCD-890', '140sqm', '3', '2', '260000', 5, 2, '2.161789', '41.189057', 0),
(18, 'EFG-123', '210sqm', '5', '4', '380000', 1, 3, '-0.15701', '39.208973', 0),
(19, 'HIJ-456', '170sqm', '4', '3', '300000', 2, 4, '-0.454434', '38.408656', 0),
(20, 'KLM-789', '200sqm', '5', '4', '350000', 3, 5, '-0.05', '39.935939', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `house_category`
--

CREATE TABLE `house_category` (
  `house_id` int(10) NOT NULL,
  `category_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `house_category`
--

INSERT INTO `house_category` (`house_id`, `category_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 5),
(2, 6),
(3, 3),
(3, 4),
(4, 4),
(4, 5),
(5, 4),
(5, 7),
(6, 3),
(7, 1),
(8, 2),
(9, 1),
(10, 3),
(11, 2),
(12, 1),
(13, 2),
(14, 1),
(15, 3),
(16, 2),
(17, 1),
(18, 2),
(19, 1),
(20, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `house_operation`
--

CREATE TABLE `house_operation` (
  `house_id` int(10) NOT NULL,
  `operation_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `house_operation`
--

INSERT INTO `house_operation` (`house_id`, `operation_id`) VALUES
(1, 1),
(1, 5),
(2, 1),
(2, 2),
(3, 3),
(4, 2),
(4, 4),
(5, 2),
(5, 3),
(6, 1),
(7, 2),
(8, 1),
(9, 2),
(10, 1),
(11, 2),
(12, 1),
(13, 2),
(14, 1),
(15, 2),
(16, 1),
(17, 2),
(18, 1),
(19, 2),
(20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `house_service`
--

CREATE TABLE `house_service` (
  `house_id` int(10) NOT NULL,
  `service_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `house_service`
--

INSERT INTO `house_service` (`house_id`, `service_id`) VALUES
(1, 5),
(1, 6),
(2, 1),
(2, 2),
(3, 1),
(3, 3),
(3, 4),
(4, 1),
(4, 3),
(4, 6),
(5, 1),
(5, 3),
(5, 7),
(6, 1),
(7, 3),
(8, 1),
(9, 2),
(10, 3),
(11, 1),
(12, 2),
(13, 3),
(14, 1),
(15, 2),
(16, 3),
(17, 1),
(18, 2),
(19, 3),
(20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `house_type`
--

CREATE TABLE `house_type` (
  `house_id` int(10) NOT NULL,
  `type_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `house_type`
--

INSERT INTO `house_type` (`house_id`, `type_id`) VALUES
(1, 2),
(2, 3),
(3, 4),
(3, 5),
(4, 1),
(5, 1),
(5, 4),
(6, 3),
(7, 2),
(8, 3),
(9, 2),
(10, 1),
(11, 3),
(12, 2),
(13, 3),
(14, 1),
(15, 2),
(16, 3),
(17, 1),
(18, 2),
(19, 3),
(20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `image_id` int(10) NOT NULL,
  `image_path` varchar(100) NOT NULL,
  `house_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`image_id`, `image_path`, `house_id`) VALUES
(1, 'view/img/house_img/house1/image1.jpg', 1),
(2, 'view/img/house_img/house1/image2.jpg', 1),
(3, 'view/img/house_img/house1/image3.jpg', 1),
(4, 'view/img/house_img/house1/image4.jpg', 1),
(5, 'view/img/house_img/house1/image5.jpg', 1),
(6, 'view/img/house_img/house2/image1.jpg', 2),
(7, 'view/img/house_img/house2/image2.jpg', 2),
(8, 'view/img/house_img/house2/image3.jpg', 2),
(9, 'view/img/house_img/house2/image4.jpg', 2),
(10, 'view/img/house_img/house2/image5.jpg', 2),
(11, 'view/img/house_img/house3/image1.jpg', 3),
(12, 'view/img/house_img/house3/image2.jpg', 3),
(13, 'view/img/house_img/house3/image3.jpg', 3),
(14, 'view/img/house_img/house3/image4.jpg', 3),
(15, 'view/img/house_img/house3/image5.jpg', 3),
(16, 'view/img/house_img/house4/image1.jpg', 4),
(17, 'view/img/house_img/house4/image2.jpg', 4),
(18, 'view/img/house_img/house4/image3.jpg', 4),
(19, 'view/img/house_img/house4/image4.jpg', 4),
(20, 'view/img/house_img/house4/image5.jpg', 4),
(21, 'view/img/house_img/house5/image1.jpg', 5),
(22, 'view/img/house_img/house5/image2.jpg', 5),
(23, 'view/img/house_img/house5/image3.jpg', 5),
(24, 'view/img/house_img/house5/image4.jpg', 5),
(25, 'view/img/house_img/house5/image5.jpg', 5),
(26, 'view/img/house_img/house6/image1.jpg', 6),
(31, 'view/img/house_img/house7/image1.jpg', 7),
(36, 'view/img/house_img/house8/image1.jpg', 8),
(41, 'view/img/house_img/house9/image1.jpg', 9),
(46, 'view/img/house_img/house10/image1.jpg', 10),
(51, 'view/img/house_img/house11/image1.jpg', 11),
(56, 'view/img/house_img/house12/image1.jpg', 12),
(61, 'view/img/house_img/house13/image1.jpg', 13),
(66, 'view/img/house_img/house14/image1.jpg', 14),
(71, 'view/img/house_img/house15/image1.jpg', 15),
(76, 'view/img/house_img/house16/image1.jpg', 16),
(81, 'view/img/house_img/house17/image1.jpg', 17),
(86, 'view/img/house_img/house18/image1.jpg', 18),
(91, 'view/img/house_img/house19/image1.jpg', 19),
(96, 'view/img/house_img/house20/image1.jpg', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `house_id` int(10) NOT NULL,
  `username` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`house_id`, `username`) VALUES
(1, 'Velksar'),
(2, 'Zarpas'),
(3, 'Velksar'),
(11, 'Velksar'),
(13, 'Velksar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

CREATE TABLE `operation` (
  `operation_id` int(10) NOT NULL,
  `operation_name` varchar(100) NOT NULL,
  `operation_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`operation_id`, `operation_name`, `operation_image`) VALUES
(1, 'Sale', 'view/img/operation_img/sale.png'),
(2, 'Rent', 'view/img/operation_img/rent.png'),
(3, 'Share', 'view/img/operation_img/share.png'),
(4, 'Rent to own', 'view/img/operation_img/rent_to_own.jpg'),
(5, 'New build', 'view/img/operation_img/new_build.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pet`
--

CREATE TABLE `pet` (
  `pet_id` int(10) NOT NULL,
  `pet_name` varchar(100) NOT NULL,
  `pet_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pet`
--

INSERT INTO `pet` (`pet_id`, `pet_name`, `pet_image`) VALUES
(1, 'Cats', 'view/img/pet_img/Cats.jpg'),
(2, 'Dogs', 'view/img/pet_img/Dogs.jpg'),
(3, 'Lizzards', 'view/img/pet_img/Lizzards.jpg'),
(4, 'Parrots', 'view/img/pet_img/Parrots.jpg'),
(5, 'Fishes', 'view/img/pet_img/Fishes.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `service_id` int(10) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`service_id`, `service_name`, `service_image`) VALUES
(1, 'Internet', 'view/img/service_img/internet.png'),
(2, 'Doorman', 'view/img/service_img/doorman.png'),
(3, 'Lift', 'view/img/service_img/lift.jpg'),
(4, 'TV', 'view/img/service_img/tv.png'),
(5, 'Garbage', 'view/img/service_img/garbage.png'),
(6, 'Security', 'view/img/service_img/security.png'),
(7, 'Parking', 'view/img/service_img/parking.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

CREATE TABLE `type` (
  `type_id` int(10) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `type_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`type_id`, `type_name`, `type_image`) VALUES
(1, 'Flat', 'view/img/type_img/flat.jpg'),
(2, 'Chalet', 'view/img/type_img/chalet.jpg'),
(3, 'Terraced House', 'view/img/type_img/terraced_house.jpg'),
(4, 'Studio', 'view/img/type_img/studio.jpg'),
(5, 'Penthouse', 'view/img/type_img/penthouse.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `token_email` varchar(10000) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `login_attempts` int(1) DEFAULT 0,
  `phone_number` varchar(20) DEFAULT NULL,
  `otp_token` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `token_email`, `is_active`, `login_attempts`, `phone_number`, `otp_token`) VALUES
(45, 'user123', '$2y$12$C/YIQmyGlnwsx562CigeQuptVUPMcfQXiQy9IV2eKgX0bjm758hrC', 'user123@example.com', 'client', 'https://i.pravatar.cc/500?u=6a69ec475f1c9f5aa2c37fb382f9ae7b', NULL, 0, 0, NULL, NULL),
(47, 'Velksar', '$2y$12$ewDhpSY/KIXQK3IR4v4VaOTU/34rWmzGBLPae10E77hhRYlJ3NHnO', 'alvarokjadjis@gmail.com', 'client', 'https://i.pravatar.cc/500?u=3f219667eb5dc73fc4facf91a37739ab', NULL, 0, 0, NULL, NULL),
(66, 'Angela892984', '$2y$12$qas4.RYF2rGIbTvFpcsRz.B2KxkWg82ED9c2djOPxpiOnoEsrJ3Sq', 'alvgarcam@alu.edu.gva.es', 'client', 'https://i.pravatar.cc/500?u=4abc56236ccdb0dd1e7a242265213eb6', '', 1, 0, '+34666777888', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`);

--
-- Indices de la tabla `exceptions`
--
ALTER TABLE `exceptions`
  ADD PRIMARY KEY (`error_id`);

--
-- Indices de la tabla `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`house_id`),
  ADD KEY `fk_city_id` (`city_id`),
  ADD KEY `fk_pet_id` (`pet_id`);

--
-- Indices de la tabla `house_category`
--
ALTER TABLE `house_category`
  ADD PRIMARY KEY (`house_id`,`category_id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indices de la tabla `house_operation`
--
ALTER TABLE `house_operation`
  ADD PRIMARY KEY (`house_id`,`operation_id`),
  ADD KEY `fk_operation_id` (`operation_id`);

--
-- Indices de la tabla `house_service`
--
ALTER TABLE `house_service`
  ADD PRIMARY KEY (`house_id`,`service_id`),
  ADD KEY `fk_service_id` (`service_id`);

--
-- Indices de la tabla `house_type`
--
ALTER TABLE `house_type`
  ADD PRIMARY KEY (`house_id`,`type_id`),
  ADD KEY `fk_type_id` (`type_id`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `fk_house_id` (`house_id`);

--
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`operation_id`);

--
-- Indices de la tabla `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indices de la tabla `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `exceptions`
--
ALTER TABLE `exceptions`
  MODIFY `error_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `house`
--
ALTER TABLE `house`
  MODIFY `house_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `operation_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pet`
--
ALTER TABLE `pet`
  MODIFY `pet_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `house`
--
ALTER TABLE `house`
  ADD CONSTRAINT `house_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`);

--
-- Filtros para la tabla `house_category`
--
ALTER TABLE `house_category`
  ADD CONSTRAINT `house_category_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  ADD CONSTRAINT `house_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
