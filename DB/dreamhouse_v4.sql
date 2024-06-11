-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 12:41:33
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `manage_like` (IN `username_p` VARCHAR(25), IN `house_id_p` INT(11), IN `operation` VARCHAR(20))   BEGIN
        IF operation = 'add' THEN
             INSERT INTO likes(house_id, username) 
             VALUES(house_id_p, username_p);

             UPDATE house
             SET likes = likes + 1
             WHERE house_id = house_id_p;
        ELSEIF operation = 'remove' THEN
             DELETE FROM likes
             WHERE username = username_p AND house_id = house_id_p;

             UPDATE house
             SET likes = likes - 1
             WHERE house_id = house_id_p;
        END IF;
        END$$

DELIMITER ;

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
(1, 'ABC-123', '200sqm', '3', '2', '200000', 1, 1, '-0.163754', '39.350387', 4),
(2, 'DEF-456', '140sqm', '4', '2', '250000', 2, 2, '-0.19722', '38.495334', 1),
(3, 'CBA-245', '88sqm', '2', '1', '150000', 3, 3, '-0.05', '40.031394', 1),
(4, 'GTQ-846', '150sqm', '5', '3', '300000', 4, 4, '-3.824652', '40.644406', 0),
(5, 'GLE-567', '105sqm', '3', '1', '180000', 5, 5, '2.180775', '41.279869', 0),
(6, 'XYZ-789', '180sqm', '4', '3', '280000', 7, 2, '-3.598557', '37.177336', 1),
(7, 'LMN-456', '120sqm', '3', '2', '220000', 6, 1, '-5.532825', '37.051456', 2),
(8, 'OQL-720', '200sqm', '5', '4', '350000', 1, 3, '-0.101304', '39.28331', 0),
(9, 'MEN-489', '150sqm', '4', '3', '280000', 2, 4, '-0.294827', '38.521622', 0),
(10, 'GHI-789', '180sqm', '4', '3', '320000', 3, 5, '-0.05', '39.97416', 0),
(11, 'JKL-012', '220sqm', '6', '4', '420000', 4, 1, '-3.825383', '40.420265', 2),
(12, 'MNO-345', '130sqm', '3', '2', '250000', 5, 2, '2.178356', '41.316204', 0),
(13, 'PQR-678', '180sqm', '4', '3', '320000', 1, 3, '-0.150987', '39.429409', 0),
(14, 'STU-901', '160sqm', '4', '3', '290000', 2, 4, '-0.12673', '38.552803', 1),
(15, 'VWX-234', '190sqm', '5', '4', '360000', 3, 5, '-0.05', '39.826494', 0),
(16, 'YZA-567', '200sqm', '6', '4', '400000', 4, 1, '-3.760404', '40.68538', 1),
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
(7, 'Angela892984'),
(1, 'Angela892984'),
(11, 'Angela892984'),
(16, 'Angela892984'),
(6, 'Zarpas'),
(2, 'weelee2'),
(1, 'weelee2'),
(3, 'weelee2'),
(1, 'alvgarcam@github'),
(1, 'yomoganan');

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
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`order_id`, `username`, `house_id`, `is_active`) VALUES
(108, 'weelee2', 1, 0),
(109, 'weelee2', 3, 0),
(110, 'weelee2', 3, 0),
(112, 'weelee2', 1, 0),
(113, 'Zarpas', 7, 0),
(114, 'weelee2', 7, 0),
(127, 'weelee2', 1, 0),
(129, 'weelee2', 1, 0),
(132, 'yomoganan', 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE `orders_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders_products`
--

INSERT INTO `orders_products` (`order_id`, `product_id`, `quantity`) VALUES
(108, 1, 5),
(108, 2, 5),
(108, 3, 5),
(109, 7, 4),
(109, 8, 6),
(109, 9, 6),
(110, 7, 4),
(110, 8, 3),
(110, 9, 1),
(112, 1, 5),
(112, 2, 2),
(112, 3, 8),
(113, 1, 14),
(113, 2, 5),
(113, 3, 1),
(114, 1, 4),
(114, 2, 10),
(114, 3, 1),
(127, 1, 4),
(127, 2, 2),
(127, 3, 10),
(129, 1, 0),
(129, 2, 0),
(129, 3, 0),
(132, 7, 5),
(132, 8, 4),
(132, 9, 3);

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
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `house_id` int(11) DEFAULT NULL,
  `pet_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `house_id`, `pet_id`, `price`, `description`, `image`, `stock`) VALUES
(1, NULL, 1, 8.99, 'Comida para gatos - 1Kg', 'view/img/product_imgs/cat_food.png', 68),
(2, NULL, 1, 15.99, 'Juguete para gatos - Ratón de cuerda', 'view/img/product_imgs/cat_toy.png', 36),
(3, NULL, 1, 25.99, 'Cama para gatos - Tamaño pequeño', 'view/img/product_imgs/cat_bed.png', 20),
(4, NULL, 2, 10.99, 'Comida para perros - 10Kg', 'view/img/product_imgs/dog_food.png', 100),
(5, NULL, 2, 20.99, 'Juguete para perros - Pelota resistente', 'view/img/product_imgs/dog_toy.png', 50),
(6, NULL, 2, 30.99, 'Cama para perros - Tamaño mediano', 'view/img/product_imgs/dog_bed.png', 20),
(7, NULL, 3, 6.99, 'Comida para lagartos - 1Kg', 'view/img/product_imgs/lizzard_food.png', 107),
(8, NULL, 3, 11.99, 'Juguete para lagartos - Túnel', 'view/img/product_imgs/lizzard_toy.png', 67),
(9, NULL, 3, 18.99, 'Terrrario para lagartos - Tamaño pequeño', 'view/img/product_imgs/lizzard_bed.png', 7),
(10, NULL, 4, 7.99, 'Comida para aves - 350g', 'view/img/product_imgs/parrot_food.png', 150),
(11, NULL, 4, 12.99, 'Juguete para aves - Campana', 'view/img/product_imgs/parrot_toy.png', 70),
(12, NULL, 4, 20.99, 'Jaula para aves - Tamaño pequeño', 'view/img/product_imgs/parrot_bed.png', 15),
(13, NULL, 5, 5.99, 'Comida para peces - 250g', 'view/img/product_imgs/fish_food.png', 200),
(14, NULL, 5, 10.99, 'Decoración para acuario - Castillo', 'view/img/product_imgs/fish_toy.png', 40),
(15, NULL, 5, 15.99, 'Filtro para acuario - Modelo D', 'view/img/product_imgs/fish_bed.png', 25),
(16, 1, 1, 200000.00, 'ABC-123', 'view/img/house_img/house1/image1.jpg', 1),
(17, 2, 2, 250000.00, 'DEF-456', 'view/img/house_img/house2/image1.jpg', 1),
(18, 3, 3, 150000.00, 'CBA-245', 'view/img/house_img/house3/image1.jpg', 1),
(19, 4, 4, 300000.00, 'GTQ-846', 'view/img/house_img/house4/image1.jpg', 1),
(20, 5, 5, 180000.00, 'GLE-567', 'view/img/house_img/house5/image1.jpg', 1),
(21, 6, 2, 280000.00, 'XYZ-789', 'view/img/house_img/house6/image1.jpg', 1),
(22, 7, 1, 220000.00, 'LMN-456', 'view/img/house_img/house7/image1.jpg', 1),
(23, 8, 3, 350000.00, 'OQL-720', 'view/img/house_img/house8/image1.jpg', 1),
(24, 9, 4, 280000.00, 'MEN-489', 'view/img/house_img/house9/image1.jpg', 1),
(25, 10, 5, 320000.00, 'GHI-789', 'view/img/house_img/house10/image1.jpg', 1),
(26, 11, 1, 420000.00, 'JKL-012', 'view/img/house_img/house11/image1.jpg', 1),
(27, 12, 2, 250000.00, 'MNO-345', 'view/img/house_img/house12/image1.jpg', 1),
(28, 13, 3, 320000.00, 'PQR-678', 'view/img/house_img/house13/image1.jpg', 1),
(29, 14, 4, 290000.00, 'STU-901', 'view/img/house_img/house14/image1.jpg', 1),
(30, 15, 5, 360000.00, 'VWX-234', 'view/img/house_img/house15/image1.jpg', 1),
(31, 16, 1, 400000.00, 'YZA-567', 'view/img/house_img/house16/image1.jpg', 1),
(32, 17, 2, 260000.00, 'BCD-890', 'view/img/house_img/house17/image1.jpg', 1),
(33, 18, 3, 380000.00, 'EFG-123', 'view/img/house_img/house18/image1.jpg', 1),
(34, 19, 4, 300000.00, 'HIJ-456', 'view/img/house_img/house19/image1.jpg', 1),
(35, 20, 5, 350000.00, 'KLM-789', 'view/img/house_img/house20/image1.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `house_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `order_id`, `house_id`, `username`, `total_price`, `date`) VALUES
(1, 108, 1, 'weelee2', 200254.85, '2024-06-02 00:00:00'),
(2, 109, 3, 'weelee2', 150213.84, '2024-06-02 00:00:00'),
(3, 110, 3, 'weelee2', 150082.92, '2024-06-02 00:00:00'),
(4, 112, 1, 'weelee2', 200284.85, '2024-06-02 01:48:46'),
(5, 113, 7, 'Zarpas', 220231.80, '2024-06-02 01:56:53'),
(6, 114, 7, 'weelee2', 220403.78, '2024-06-02 02:19:00'),
(7, 127, 1, 'weelee2', 200327.84, '2024-06-03 21:03:15'),
(8, 129, 1, 'weelee2', 200000.00, '2024-06-03 21:32:11'),
(9, 132, 3, 'yomoganan', 150139.88, '2024-06-10 18:44:29');

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
(66, 'Angela892984', '$2y$12$qas4.RYF2rGIbTvFpcsRz.B2KxkWg82ED9c2djOPxpiOnoEsrJ3Sq', 'alvgarcam@alu.edu.gva.com', 'client', 'https://i.pravatar.cc/500?u=4abc56236ccdb0dd1e7a242265213eb6', '', 1, 1, '+34666777888', ''),
(67, 'weelee', '$2y$10$F10B54pJXecIRWbTrZS1Ked0dT9SusN7H3yVI.iW.BnHtfCbhWsde', '', 'client', 'https://i.pravatar.cc/500?u=4ef9b96e90cc031cb116ff5c7b42543a', NULL, 0, 0, '622666358', ''),
(73, 'alvgarcam@github', '', 'alvgarcam@alu.edu.gva.es', 'client', 'https://avatars.githubusercontent.com/u/157162001?v=4', '', 0, 0, NULL, NULL),
(74, 'al.garridocampos@google', '', 'al.garridocampos@gmail.com', 'client', 'https://lh3.googleusercontent.com/a/ACg8ocId7vL4zhNr2rINX3JBLRx9IIoAlQGr9gJrL3wZkSYh06_lgg=s96-c', '', 0, 0, NULL, NULL),
(75, 'Zarpas', '$2y$10$Ntj23DpXWtLmOY7abFb...RErTZdGgYYh92jP4/19cgmUcG0zBPKS', 'MTorres.Salvador@gmail.com', 'client', 'https://i.pravatar.cc/500?u=e456396ec54874479fb01160b5810d0b', NULL, 1, 0, NULL, NULL),
(77, 'weelee123', '$2y$10$F10B54pJXecIRWbTrZS1Ked0dT9SusN7H3yVI.iW.BnHtfCbhWsde', NULL, 'client', 'https://i.pravatar.cc/500?u=4ef9b96e90cc031cb116ff5c7b42543a', NULL, 0, 1, '622666358', ''),
(78, 'yomogan', '$2y$12$uZJkB7m.H56M6ecJl38jeuv4kYRjHIOsqRJ4UBh5zDTIl5O0G/9Ry', NULL, 'client', 'https://i.pravatar.cc/500?u=9154526c03ad3e327b28e3f1f7582e3a', '', 0, 0, '789456123', ''),
(79, 'yomogana', '$2y$12$uZJkB7m.H56M6ecJl38jeuv4kYRjHIOsqRJ4UBh5zDTIl5O0G/9Ry', NULL, 'client', 'https://i.pravatar.cc/500?u=9154526c03ad3e327b28e3f1f7582e3a', NULL, 0, 0, '789456123', NULL),
(80, 'yomoganan', '$2y$12$uZJkB7m.H56M6ecJl38jeuv4kYRjHIOsqRJ4UBh5zDTIl5O0G/9Ry', 'yomoganan@hotmail.com', 'client', 'https://i.pravatar.cc/500?u=9154526c03ad3e327b28e3f1f7582e3a', NULL, 1, 0, '789456123', NULL),
(81, 'yomoganan445', '$2y$10$F10B54pJXecIRWbTrZS1Ked0dT9SusN7H3yVI.iW.BnHtfCbhWsde', NULL, 'client', 'https://i.pravatar.cc/500?u=4ef9b96e90cc031cb116ff5c7b42543a', NULL, 0, 0, '622666358', NULL),
(82, 'Weelee20', '$2y$10$F10B54pJXecIRWbTrZS1Ked0dT9SusN7H3yVI.iW.BnHtfCbhWsde', NULL, 'client', 'view/img/uploaded_files/avatar/Weelee20_2024-06-11_03-06-37_team1.png', NULL, 0, 0, '622666358', NULL),
(83, 'weelee2', '$2y$10$F10B54pJXecIRWbTrZS1Ked0dT9SusN7H3yVI.iW.BnHtfCbhWsde', 'Alvaro20cs@hotmail.com', 'client', 'view/img/uploaded_files/avatar/weelee2_2024-06-11_12-04-11_team2.jpg', NULL, 1, 0, '622666358', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `username_changes`
--

CREATE TABLE `username_changes` (
  `change_id` int(11) NOT NULL,
  `old_username` varchar(255) DEFAULT NULL,
  `new_username` varchar(255) DEFAULT NULL,
  `data` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `username_changes`
--

INSERT INTO `username_changes` (`change_id`, `old_username`, `new_username`, `data`) VALUES
(1, 'weelee', 'weelee123', '2024-06-05 21:18:58.000000'),
(2, 'yomogan', 'yomogana', '2024-06-10 19:28:20.000000'),
(3, 'yomogana', 'yomoganan', '2024-06-10 19:30:58.000000'),
(4, 'weelee123', 'yomoganan445', '2024-06-10 21:10:29.000000'),
(5, 'yomoganan445', 'Weelee20', '2024-06-10 21:14:28.000000'),
(6, 'Weelee20', 'weelee2', '2024-06-11 03:08:20.000000');

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
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD KEY `house_id` (`house_id`),
  ADD KEY `username` (`username`);

--
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`operation_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indices de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`);

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
-- Indices de la tabla `username_changes`
--
ALTER TABLE `username_changes`
  ADD PRIMARY KEY (`change_id`);

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
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT de la tabla `pet`
--
ALTER TABLE `pet`
  MODIFY `pet_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `username_changes`
--
ALTER TABLE `username_changes`
  MODIFY `change_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Filtros para la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
