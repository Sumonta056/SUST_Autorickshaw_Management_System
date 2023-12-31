-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2023 at 09:37 AM
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
-- Table structure for table `autorickshaw`
--

CREATE TABLE `autorickshaw` (
  `autorickshaw_number` varchar(10) NOT NULL,
  `autorickshaw_company` varchar(30) DEFAULT NULL,
  `autorickshaw_model` varchar(20) DEFAULT NULL,
  `driver_nid` varchar(17) DEFAULT NULL,
  `owner_nid` varchar(17) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autorickshaw`
--

INSERT INTO `autorickshaw` (`autorickshaw_number`, `autorickshaw_company`, `autorickshaw_model`, `driver_nid`, `owner_nid`) VALUES
('11', 'qwe', '12344', '1234567891', '2018201912'),
('12', 'xpres', '13212', '1234567891', '1234567891'),
('122', 'Toyto', 'poww', '1234567892', '2018201912'),
('1233', 'qwe', 'q1212', '1234567891', '2018201912'),
('13', 'Wps', '1231', '1234567898', '2018201912'),
('32', 'Qwew', '12322', '1231231231', '2018201912'),
('54', 'ASDS', '12333', '1231231231', '2018201912');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstName`, `lastName`, `email`, `phone`, `image`, `address`, `city`) VALUES
(1, 'John', 'Doe', 'johndoe@example.com', '123-456-7890', 'https://example.com/john.jpg', '123 Main St', 'City1'),
(2, 'Jane', 'Smith', 'janesmith@example.com', '987-654-3210', 'https://example.com/jane.jpg', '456 Elm St', 'City2'),
(3, 'John', 'Doe', 'johndoe@example.com', '123-456-7890', 'https://example.com/john.jpg', '123 Main St', 'City1'),
(4, 'Jane', 'Smith', 'janesmith@example.com', '987-654-3210', 'https://example.com/jane.jpg', '456 Elm St', 'City2'),
(5, 'Alice', 'Johnson', 'alice@example.com', '555-555-5555', 'https://example.com/alice.jpg', '789 Oak St', 'City3'),
(6, 'Bob', 'Brown', 'bob@example.com', '444-444-4444', 'https://example.com/bob.jpg', '567 Pine St', 'City1'),
(7, 'Eve', 'White', 'eve@example.com', '777-777-7777', 'https://example.com/eve.jpg', '101 Cedar St', 'City2'),
(8, 'Michael', 'Wilson', 'michael@example.com', '999-999-9999', 'https://example.com/michael.jpg', '321 Birch St', 'City3'),
(9, 'Sarah', 'Taylor', 'sarah@example.com', '222-222-2222', 'https://example.com/sarah.jpg', '555 Willow St', 'City1'),
(10, 'David', 'Lee', 'david@example.com', '111-111-1111', 'https://example.com/david.jpg', '888 Maple St', 'City2'),
(11, 'Emily', 'Clark', 'emily@example.com', '666-666-6666', 'https://example.com/emily.jpg', '222 Redwood St', 'City3'),
(12, 'Peter', 'Hall', 'peter@example.com', '333-333-3333', 'https://example.com/peter.jpg', '777 Cedar St', 'City1');

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
  `driver_license_no` varchar(20) DEFAULT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driver_nid`, `driver_name`, `driver_date_of_birth`, `driver_houseNo`, `driver_postalCode`, `driver_address`, `driver_license_no`, `id`) VALUES
('1234567897', 'Promi Saha', '2023-09-05', '12', '1330', 'Shariatpur', '123456789012345', 2),
('1234567898', 'Mazarul Islam', '2023-09-08', '12', '1400', 'Narayanganj', '123456789012342', 4),
('1234567899', 'Ratul Saha', '2023-08-31', '45', '1000', 'Jhenaidah', '123456789111111', 5),
('1112223331', 'Mahamud Ali', '2023-09-12', '123', '1400', 'Jhalokathi', '123123123123123', 6);

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
(1234567891, 'Sumonta', '2023-08-30', 12, 1400, 'Jhalokathi');

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

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`owner_nid`, `owner_name`, `owner_date_of_birth`, `owner_houseNo`, `owner_postalCode`, `owner_address`) VALUES
('1234567890', 'Sumonta', '2000-12-11', '20', '2021', 'Dhaka'),
('1234567891', 'gg', '2000-12-11', '10', '1440', 'dhaka'),
('1234567892', 'Promi Mojumder', '2000-12-14', '20', '4000', 'Dhaka'),
('1234567719', 'Rahim Miya', '0000-00-00', '20', '1400', 'Dhaka'),
('1234567894', 'Sumonta Saha', '2000-12-04', '12', '1400', 'নরায়ণগঞ্জ'),
('1234567899', 'Gg', '2023-09-14', '12', '1333', 'পটুয়াখালী'),
('2018201912', 'Kali Mama', '2023-09-20', '13', '1400', 'ভোলা');

-- --------------------------------------------------------

--
-- Table structure for table `serial`
--

CREATE TABLE `serial` (
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `serial`
--

INSERT INTO `serial` (`name`, `email`, `id`) VALUES
('sumonta', 'sumonta@gmail.com', 2);

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
(126, 's', 's@gmail.com', '123qweASD'),
(127, 'ss', 'ss@gmail.com', '123QWEasd'),
(128, 'sumonta', 'sumonta@gmail.com', '123qweASD'),
(129, 'sumonta', 'mridul@gmail.com', '123QWEasd'),
(130, 'ppp', 'p@gmail.com', '123qweASD'),
(131, 'Suma', 'suma@gmail.com', '123qweASD'),
(132, 'po', 'po@gmai.com', '123qweASD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autorickshaw`
--
ALTER TABLE `autorickshaw`
  ADD PRIMARY KEY (`autorickshaw_number`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `driver_nid` (`driver_nid`);

--
-- Indexes for table `serial`
--
ALTER TABLE `serial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `serial`
--
ALTER TABLE `serial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
