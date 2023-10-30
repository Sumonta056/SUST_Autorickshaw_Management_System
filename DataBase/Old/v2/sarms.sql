-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2023 at 07:46 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sarms`
--

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `owner_nid` varchar(17) NOT NULL,
  `owner_name` varchar(30) DEFAULT NULL,
  `owner_date_of_birth` date DEFAULT NULL,
  `owner_houseNo` varchar(40) DEFAULT NULL,
  `owner_postalCode` varchar(40) DEFAULT NULL,
  `owner_address` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(49, 'qq', 'qq@gmail.com', '1232qweweAA'),
(50, 'qq', 'qq@gmail.com', '1232qweweAA'),
(51, 'qq', 'qq@gmail.com', '1232qweweAA'),
(52, 'sumonta', 'sumonta@gmail.com', '123qweASd'),
(53, 'ff', 'ff@gmail.com', '123123dafV'),
(54, 'gs', 'sg@gmail.com', '123qweASD'),
(55, 'gg', 'gg@gmail.com', '123QWEASf'),
(56, 'ff', 'ff@gmail.com', '123123dafV'),
(57, 'gs', 'sg@gmail.com', '123qweASD'),
(58, 'sumonta', 'sumonta@gmail.com', '123qweASd'),
(59, 'fsg', 'adfa@gmail.coma', '123qweASD'),
(60, 'hh', 'hh@gmail.com', '3123adfsV'),
(61, 'sumonta', 'ss@gmail.com', '123asdQWE'),
(62, 'gg', 'ga@gmail.com', '1234567asdAS'),
(63, 'gg', 'ga@gmail.com', '1234567asdAS'),
(64, 'sumonta', 'ss@gmail.com', '123asdQWE'),
(65, 'gg', 'gg@gmail.com', '123asdQWE'),
(66, 'fa', 'fad@gmail.com', '123asdQWE'),
(67, 'qw', 'qw@gmail.com', '123qweASD'),
(68, 'ami', 'ami@gmail.com', '123asdQWE'),
(79, 'sumonta', 'saha@gmail.com', '123asdQWE'),
(80, 'PROMI MOJUMDER', 'promimojumder8@gmail.com', '123asdQWE'),
(81, 'Promi', 'promimojumder@gmail.com', '1232qweweAA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`owner_nid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
