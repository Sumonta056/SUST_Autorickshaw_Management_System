-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 08:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
-- Table structure for table `autorickshaw`
--

CREATE TABLE `autorickshaw` (
  `autorickshaw_number` varchar(255) NOT NULL,
  `autorickshaw_company` varchar(255) NOT NULL,
  `autorickshaw_model` varchar(255) NOT NULL,
  `driver_nid` varchar(10) NOT NULL,
  `owner_nid` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autorickshaw`
--

INSERT INTO `autorickshaw` (`autorickshaw_number`, `autorickshaw_company`, `autorickshaw_model`, `driver_nid`, `owner_nid`) VALUES
('13', 'tata', '14pro', '2019831038', '2019831056');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driver_nid` varchar(17) NOT NULL,
  `driver_name` varchar(30) DEFAULT NULL,
  `driver_date_of_birth` varchar(20) DEFAULT NULL,
  `driver_houseNo` varchar(40) DEFAULT NULL,
  `driver_postalCode` varchar(40) DEFAULT NULL,
  `driver_address` varchar(40) DEFAULT NULL,
  `driver_license_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driver_nid`, `driver_name`, `driver_date_of_birth`, `driver_houseNo`, `driver_postalCode`, `driver_address`, `driver_license_no`) VALUES
('2019831031', 'Promi', '2023-09-11', '22', '2222', 'Patuakhali', '201983103855551'),
('2019831037', 'Promi', '2023-09-11', '22', '2222', 'Patuakhali', '201983103855558'),
('2019831038', 'Promi', '2023-09-03', '22', '2222', 'Patuakhali', '201983103855555');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `manager_nid` int(11) NOT NULL,
  `manager_name` varchar(255) DEFAULT NULL,
  `manager_date_of_birth` date DEFAULT NULL,
  `manager_houseNo` int(11) DEFAULT NULL,
  `manager_postalCode` int(11) DEFAULT NULL,
  `manager_address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`manager_nid`, `manager_name`, `manager_date_of_birth`, `manager_houseNo`, `manager_postalCode`, `manager_address`) VALUES
(2019831038, 'Rofiq', '2023-08-27', 12, 2222, 'Bhola');

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `owner_nid` varchar(17) NOT NULL,
  `owner_name` varchar(30) DEFAULT NULL,
  `owner_date_of_birth` varchar(20) DEFAULT NULL,
  `owner_houseNo` varchar(40) DEFAULT NULL,
  `owner_postalCode` varchar(40) DEFAULT NULL,
  `owner_address` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`owner_nid`, `owner_name`, `owner_date_of_birth`, `owner_houseNo`, `owner_postalCode`, `owner_address`) VALUES
('2019831030', 'Promi', '2023-08-29', '12', '3100', 'Jhalokathi'),
('2019831038', 'Promi', '2000-11-28', '12', '3100', 'Sylhet'),
('2019831055', 'Sumonta', '2000-11-28', '124', '3101', 'Dhaka'),
('2019831056', 'Mridul', '2000-04-11', '92', '3100', 'Sylhet');

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
(80, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autorickshaw`
--
ALTER TABLE `autorickshaw`
  ADD PRIMARY KEY (`autorickshaw_number`),
  ADD UNIQUE KEY `driver_nid` (`driver_nid`),
  ADD KEY `owner_nid` (`owner_nid`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driver_nid`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`manager_nid`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `autorickshaw`
--
ALTER TABLE `autorickshaw`
  ADD CONSTRAINT `autorickshaw_ibfk_1` FOREIGN KEY (`owner_nid`) REFERENCES `owner` (`owner_nid`),
  ADD CONSTRAINT `autorickshaw_ibfk_2` FOREIGN KEY (`driver_nid`) REFERENCES `driver` (`driver_nid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
