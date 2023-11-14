-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2023 at 03:33 PM
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
-- Table structure for table `autorickshaw_schedule`
--

CREATE TABLE `autorickshaw_schedule` (
  `id` int(11) NOT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `autorickshaw_number` varchar(255) DEFAULT NULL,
  `autorickshaw_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autorickshaw_schedule`
--
ALTER TABLE `autorickshaw_schedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_schedule_autorickshaw` (`schedule_id`,`autorickshaw_number`),
  ADD KEY `autorickshaw_number` (`autorickshaw_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autorickshaw_schedule`
--
ALTER TABLE `autorickshaw_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `autorickshaw_schedule`
--
ALTER TABLE `autorickshaw_schedule`
  ADD CONSTRAINT `autorickshaw_schedule_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  ADD CONSTRAINT `autorickshaw_schedule_ibfk_2` FOREIGN KEY (`autorickshaw_number`) REFERENCES `autorickshaw` (`autorickshaw_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
