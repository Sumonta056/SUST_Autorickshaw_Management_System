-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2023 at 03:59 AM
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
-- Table structure for table `authority`
--

CREATE TABLE `authority` (
  `authority_id` int(11) NOT NULL,
  `authority_name` varchar(255) DEFAULT NULL,
  `authority_position` varchar(255) DEFAULT NULL,
  `authority_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authority`
--

INSERT INTO `authority` (`authority_id`, `authority_name`, `authority_position`, `authority_email`) VALUES
(1, 'Ahsan Habib', 'Assistant Proctor', 'ahabib-iict@sust.edu'),
(2, 'Dr Md Qumruzzaman Chowdhury', 'Proctor', 'qumrul-for@sust.edu'),
(3, 'Muhammad Mizanur Rahman', 'Assistant Proctor', 'mizanssdeap@gmail.com'),
(4, 'MD Shajjadur Rahman', 'Assistant Proctor', 'shajjadshishir92@gmail.com'),
(5, 'Jahid Hasan Shourove', 'Assistant Proctor', 'shourove-fet@sust.edu'),
(6, 'Dr. Mirza Nazmul Hasan', 'Assistant Proctor', 'hasanmirza-sta@sust.edu'),
(9, 'Mohammad Kamruzzaman Khan Prince', 'Assistant Proctor', 'kamruzzaman-eee@sust.edu'),
(10, 'Avijit Chakrabarty Ayon', 'Assistant Proctor', 'avijit-soc@sust.edu'),
(11, 'Md. Azizul Fazal', 'Assistant Proctor', 'mafazal-ocg@sust.edu'),
(12, 'Md. Syamul Bashar', 'Assistant Proctor', 'md.syamul-mee@sust.edu'),
(13, 'Abdullah Al Islam', 'Assistant Proctor', 'abdullah-sta@sust.edu'),
(14, 'Dr. Mohammad Anamul Haque', 'Assistant Proctor', 'haque-sta@sust.edu');

-- --------------------------------------------------------

--
-- Table structure for table `autorickshaw`
--

CREATE TABLE `autorickshaw` (
  `autorickshaw_number` varchar(10) NOT NULL,
  `autorickshaw_company` varchar(30) DEFAULT NULL,
  `autorickshaw_model` varchar(20) DEFAULT NULL,
  `driver_nid` varchar(17) DEFAULT NULL,
  `owner_nid` varchar(17) DEFAULT NULL,
  `vehicle_registration_number` varchar(255) DEFAULT NULL,
  `chassis_number` varchar(255) DEFAULT NULL,
  `engine_number` varchar(255) DEFAULT NULL,
  `id` int(10) NOT NULL,
  `autorickshaw_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autorickshaw`
--

INSERT INTO `autorickshaw` (`autorickshaw_number`, `autorickshaw_company`, `autorickshaw_model`, `driver_nid`, `owner_nid`, `vehicle_registration_number`, `chassis_number`, `engine_number`, `id`, `autorickshaw_status`) VALUES
('110', 'TVS', 'King', '2345678901', '8765432109', '7654321098', '23456789012345678', '234567890123456', 3, 1),
('78', 'Piaggio', 'Ape', '3456789012', '7654321098', '6543210987', '34567890123456789', '345678901234567', 4, 1),
('77', 'Bajaj', 'Qute', '7890123456', '3210987654', '2109876543', '78901234567890123', '789012345678901', 8, 1),
('45', 'Bajaj', 'Maxima', '0123456789', '0987654321', '9876543210', '01234567890123456', '012345678901234', 11, 1),
('98', 'Bajas', 'A6-072', '2019831056', '2019831038', '1010101010', '10101010101010101', '101010101011111', 12, 1),
('89', 'Bajas', 'A202', '9988776655', '9999988888', '0890890890', '08908908900890890', '089089089011122', 13, 1),
('93', 'Tata', 'P-89U', '1201201201', '1234123412', '7890789012', '78907890127890789', '789078901212345', 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `autorickshaw_schedule`
--

CREATE TABLE `autorickshaw_schedule` (
  `id` int(11) NOT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `autorickshaw_number` varchar(255) DEFAULT NULL,
  `autorickshaw_status` tinyint(1) DEFAULT 0,
  `autorickshaw_schedule_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autorickshaw_schedule`
--

INSERT INTO `autorickshaw_schedule` (`id`, `schedule_id`, `autorickshaw_number`, `autorickshaw_status`, `autorickshaw_schedule_time`) VALUES
(14, 28, '110', 0, '8:23:41 AM'),
(15, 28, '78', 0, '8:23:45 AM'),
(16, 28, '77', 0, '8:23:47 AM'),
(17, 28, '45', 0, '8:23:52 AM'),
(18, 28, '98', 0, '8:23:54 AM'),
(19, 28, '89', 0, '8:23:56 AM'),
(20, 29, '110', 0, '8:29:39 AM'),
(21, 29, '78', 1, ''),
(22, 29, '77', 0, '8:29:44 AM'),
(23, 29, '45', 0, '8:29:46 AM'),
(24, 29, '98', 1, ''),
(25, 29, '89', 1, ''),
(26, 29, '93', 0, '8:51:20 AM');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driver_nid` varchar(17) NOT NULL,
  `driver_date_of_birth` varchar(20) DEFAULT NULL,
  `driver_houseNo` varchar(40) DEFAULT NULL,
  `driver_postalCode` varchar(40) DEFAULT NULL,
  `driver_address` varchar(40) DEFAULT NULL,
  `driver_license_no` varchar(20) DEFAULT NULL,
  `id` int(100) NOT NULL,
  `driver_firstName` varchar(30) NOT NULL,
  `driver_lastName` varchar(30) NOT NULL,
  `driver_status` tinyint(1) NOT NULL DEFAULT 0,
  `driver_permission_start_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driver_nid`, `driver_date_of_birth`, `driver_houseNo`, `driver_postalCode`, `driver_address`, `driver_license_no`, `id`, `driver_firstName`, `driver_lastName`, `driver_status`, `driver_permission_start_date`) VALUES
('3456789012', '1992-11-20', 'Surma R 7', '3100', 'Sylhet', '345678901234567', 11, 'Siam', 'Ridwan', 1, '2023-10-01'),
('7890123456', '1985-03-30', 'Chompa D 33', '3300', 'Comilla', '789012345678901', 15, 'Mehraj', 'Haque', 1, '2023-08-01'),
('8901234567', '1994-07-12', 'Doyel L 2', '9000', 'Dinajpur', '890123456789012', 16, 'Samir', 'Rahman', 1, '2023-11-12'),
('0123456789', '1983-05-18', 'Rajia F 6', '5500', 'Rangpur', '012345678901234', 18, 'Imran', 'Ali', 1, '2023-10-28'),
('2019831056', '2000-04-01', 'Khilgao', '1400', 'Pirojpur', '201983105612345', 20, 'Habib', 'Bashar', 0, ''),
('9988776655', '1990-11-11', 'Amborkhana', '1300', 'Sylhet', '998877665599887', 21, 'Rafi ', 'Rahman', 0, ''),
('1201201201', '2000-11-11', 'Khilgao', '1400', 'Dhaka', '120120120122211', 22, 'Ratul', 'Osman', 1, '2023-10-28');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `manager_nid` varchar(30) NOT NULL,
  `manager_firstName` varchar(255) DEFAULT NULL,
  `manager_lastName` varchar(255) NOT NULL,
  `manager_date_of_birth` varchar(255) DEFAULT NULL,
  `manager_houseNo` varchar(255) DEFAULT NULL,
  `manager_postalCode` int(11) DEFAULT NULL,
  `manager_address` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `manager_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`manager_nid`, `manager_firstName`, `manager_lastName`, `manager_date_of_birth`, `manager_houseNo`, `manager_postalCode`, `manager_address`, `id`, `manager_status`) VALUES
('1234567890', 'Rohim', 'Mia', '1990-01-01', 'Topobon C-55', 3100, 'Sylhet', 98, 1),
('2345678901', 'Ahmed', 'Khan', '1985-05-15', 'Green City B-12', 4000, 'Dhaka', 99, 1),
('4567890123', 'Mehmood', 'Ali', '1992-08-10', 'Mohona M-9', 2200, 'Rajshahi', 101, 0),
('6789012345', 'Abdul', 'Haque', '1975-09-05', 'Meghna D-14', 7000, 'Khulna', 103, 0),
('7890123456', 'Momen', 'Haque', '1987-04-30', 'Lovely B-33', 3300, 'Comilla', 104, 0),
('8901234567', 'Siddique', 'Rahman', '1994-07-12', 'Amlapara L-222', 1200, 'Narayanganj', 105, 0),
('9012345678', 'Anowar', 'Aziz', '1983-12-08', 'Mohona F-8', 5000, 'Sylhet', 106, 0),
('0123456789', 'Papon', 'Sarkar', '1970-06-18', 'Surma H-6', 9000, 'Dinajpur', 107, 0);

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `owner_nid` varchar(17) NOT NULL,
  `owner_tradeLicenseNo` varchar(255) NOT NULL,
  `owner_insuranceNo` varchar(255) NOT NULL,
  `owner_date_of_birth` varchar(20) DEFAULT NULL,
  `owner_houseNo` varchar(40) DEFAULT NULL,
  `owner_postalCode` varchar(40) DEFAULT NULL,
  `owner_address` varchar(40) DEFAULT NULL,
  `id` int(10) NOT NULL,
  `owner_firstName` varchar(30) NOT NULL,
  `owner_lastName` varchar(30) NOT NULL,
  `owner_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`owner_nid`, `owner_tradeLicenseNo`, `owner_insuranceNo`, `owner_date_of_birth`, `owner_houseNo`, `owner_postalCode`, `owner_address`, `id`, `owner_firstName`, `owner_lastName`, `owner_status`) VALUES
('5678901234', '201983104420198314', '20198310442019831448', '1988-05-25', 'SUST G 3', '8000', 'Barishal', 13, 'Nayem', 'Haque', 1),
('7890123456', '201983104420198316', '20198310442019831640', '1987-07-30', 'Mohona B 33', '3300', 'Comilla', 15, 'Taijul', 'Islam', 1),
('8901234567', '201983104420198317', '20198310442019831741', '1994-04-12', 'Jamuna L 2', '1200', 'Narayanganj', 16, 'Asif', 'Islam', 1),
('9012345678', '201983104420198318', '20198310442019831842', '1983-12-08', 'Meghna F 8', '5000', 'Sylhet', 17, 'Faruk', 'Aziz', 1),
('0123456789', '201983104420198319', '20198310442019831943', '1970-06-18', 'Akhalia H 6', '9000', 'Dinajpur', 18, 'Nahid', 'Hossain', 1),
('2019831038', '201983103820198310', '20198310382019831038', '2000-12-28', 'Modina Market', '1300', 'Sylhet', 19, 'Amit', 'Hasan', 1),
('9999988888', '999998888899999888', '99999888889999988888', '1980-11-11', 'Modina Market', '1300', 'Sylhet', 20, 'Mohim', 'Ahmed', 0),
('1234123412', '123412341212341234', '12341234121234123412', '1990-11-11', 'Modina Market', '1390', 'Sylhet', 21, 'Ayon', 'Sarker', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_amount` decimal(10,0) NOT NULL,
  `payment_date` varchar(10) NOT NULL,
  `driver_nid` varchar(255) NOT NULL,
  `autorickshaw_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_amount`, `payment_date`, `driver_nid`, `autorickshaw_number`) VALUES
(53, 800, '2023-11-02', '3456789012', '78'),
(54, 20, '2023-11-02', '3456789012', '78'),
(55, 1000, '2023-11-02', '7890123456', '77'),
(56, 25, '2023-11-09', '0123456789', '45'),
(57, 100, '2023-11-15', '1201201201', '93');

-- --------------------------------------------------------

--
-- Table structure for table `permit`
--

CREATE TABLE `permit` (
  `id` int(11) NOT NULL,
  `authority_name` varchar(255) NOT NULL,
  `authority_position` varchar(255) NOT NULL,
  `autorickshaw_number` varchar(255) NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `driver_nid` varchar(255) NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `permit_endDate` varchar(255) NOT NULL,
  `permit_startDate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permit`
--

INSERT INTO `permit` (`id`, `authority_name`, `authority_position`, `autorickshaw_number`, `driver_name`, `driver_nid`, `owner_name`, `permit_endDate`, `permit_startDate`) VALUES
(3, 'Ahsan Habib', 'Assistant Proctor', '98', 'Habib Bashar', '2019831056', 'Amit Hasan', '13 November, 2024', '13 November, 2023'),
(5, 'Ahsan Habib', 'Assistant Proctor', '89', 'Rafi  Rahman', '9988776655', 'Mohim Ahmed', '14 November, 2024', '14 November, 2023'),
(6, 'Ahsan Habib', 'Assistant Proctor', '93', 'Ratul Osman', '1201201201', 'Ayon Sarker', '15 November, 2024', '15 November, 2023');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(255) NOT NULL,
  `schedule_date` varchar(255) NOT NULL,
  `schedule_time` varchar(255) NOT NULL,
  `schedule_round` varchar(255) NOT NULL,
  `schedule_place` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `schedule_date`, `schedule_time`, `schedule_round`, `schedule_place`) VALUES
(28, '2023-11-15', '08:30', '1', 'E Building'),
(29, '2023-11-15', '08:30', '2', 'Boys Hall');

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
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `admin_info` varchar(30) NOT NULL,
  `authority_adminType` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `admin_info`, `authority_adminType`) VALUES
(145, 'Ahsan Habib', 'Ahsan@468', 'Ahsan@468', 'ahabib-iict@sust.edu', 'কর্তৃপক্ষ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`authority_id`);

--
-- Indexes for table `autorickshaw`
--
ALTER TABLE `autorickshaw`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `autorickshaw_number` (`autorickshaw_number`);

--
-- Indexes for table `autorickshaw_schedule`
--
ALTER TABLE `autorickshaw_schedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_schedule_autorickshaw` (`schedule_id`,`autorickshaw_number`),
  ADD KEY `autorickshaw_number` (`autorickshaw_number`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `driver_nid` (`driver_nid`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `driver_nid` (`driver_nid`),
  ADD KEY `autorickshaw_number` (`autorickshaw_number`);

--
-- Indexes for table `permit`
--
ALTER TABLE `permit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `autorickshaw`
--
ALTER TABLE `autorickshaw`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `autorickshaw_schedule`
--
ALTER TABLE `autorickshaw_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `permit`
--
ALTER TABLE `permit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `serial`
--
ALTER TABLE `serial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`driver_nid`) REFERENCES `driver` (`driver_nid`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`autorickshaw_number`) REFERENCES `autorickshaw` (`autorickshaw_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
