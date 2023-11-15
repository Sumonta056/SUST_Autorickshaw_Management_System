-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2023 at 08:06 AM
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
  `authority_email` varchar(255) DEFAULT NULL,
  `authority_nid` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authority`
--

INSERT INTO `authority` (`authority_id`, `authority_name`, `authority_position`, `authority_email`, `authority_nid`) VALUES
(1, 'Mohammad Shahidur Rahman', 'Professor', 'shahidur.cse@sust.edu', '8717259377'),
(2, 'Dr. Mohammad Reza Selim', 'Professor', 'selim.cse@sust.edu', '8708132650'),
(3, 'M. Jahirul Islam, PhD., PEng.', 'Professor', 'jahirul.cse@sust.edu', '7388885396'),
(4, 'Mohammad Abdullah Al Mumin', 'Professor', 'mumin.cse@sust.edu', '9820029306'),
(5, 'Md Masum', 'Professor & Head', 'masum.cse@sust.edu', '7933490620'),
(6, 'Dr. Md Forhad Rabbi, SMIEEE', 'Professor', 'forhad.cse@sust.edu', '9207365459'),
(7, 'Dr. Husne Ara Chowdhury', 'Associate Professor', 'husneara.cse@sust.edu', '3236355713'),
(8, 'Dr. Sadia Sultana', 'Associate Professor', 'sadiasultana.cse@sust.edu', '5559682465'),
(9, 'Mahruba Sharmin Chowdhury', 'Assistant Professor', 'mahruba.cse@sust.edu', '8089345462'),
(10, 'Ayesha Tasnim', 'Assistant Professor', 'ayesha.cse@sust.edu', '4767680197'),
(11, 'Md. Eamin Rahman', 'Assistant Professor', 'eamin.cse@sust.edu', '7570364873'),
(12, 'Md Saiful Islam', 'Assistant Professor', 'saifulislam.cse@sust.edu', '4548784054'),
(13, 'Marium-E-Jannat', 'Assistant Professor', 'marium.cse@sust.edu', '8032825929'),
(14, 'Md Mahfuzur Rahaman', 'Assistant Professor', 'mahfuzur.cse@sust.edu', '7517777760'),
(15, 'Md Mahadi Hasan Nahid', 'Assistant Professor', 'nahid.cse@sust.edu', '3490411291'),
(16, 'Enamul Hassan', 'Assistant Professor', 'enamulhassan.cse@sust.edu', '2898723450'),
(17, 'MOQSADUR RAHMAN', 'Assistant Professor', 'moqsadur.cse@sust.edu', '3022383654'),
(18, 'Summit Haque', 'Assistant Professor', 'summithaque.cse@sust.edu', '5415748197'),
(19, 'Arnab Sen Sharma', 'Assistant Professor', 'arnabsharma.cse@sust.edu', '8011590302'),
(20, 'Maruf Ahmed Mridul', 'Assistant Professor', 'mridul.cse@sust.edu', '4810707196'),
(21, 'A.K.M. Fakhrul Hossain', 'Lecturer', 'fakhrul-cse@sust.edu', '8018765353'),
(22, 'A.K.M. Fakhrul Hossain', 'Lecturer', 'a.k.m.fakhrul.hossain@gmail.com', '6661705456');

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
('90', 'TVS', 'King', '5678901234', '5432109876', '4321098765', '56789012345678901', '567890123456789', 6, 1),
('81', 'Piaggio', 'Ape', '6789012345', '4321098765', '3210987654', '67890123456789012', '678901234567890', 7, 1),
('77', 'Bajaj', 'Qute', '7890123456', '3210987654', '2109876543', '78901234567890123', '789012345678901', 8, 1),
('23', 'TVS', 'King', '8901234567', '2109876543', '1098765432', '89012345678901234', '890123456789012', 9, 0),
('34', 'Piaggio', 'Ape', '9012345678', '1098765432', '0987654321', '90123456789012345', '901234567890123', 10, 0),
('45', 'Bajaj', 'Maxima', '0123456789', '0987654321', '9876543210', '01234567890123456', '012345678901234', 11, 0);

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
  `driver_date_of_birth` varchar(20) DEFAULT NULL,
  `driver_houseNo` varchar(40) DEFAULT NULL,
  `driver_postalCode` varchar(40) DEFAULT NULL,
  `driver_address` varchar(40) DEFAULT NULL,
  `driver_license_no` varchar(20) DEFAULT NULL,
  `id` int(100) NOT NULL,
  `driver_firstName` varchar(30) NOT NULL,
  `driver_lastName` varchar(30) NOT NULL,
  `driver_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driver_nid`, `driver_date_of_birth`, `driver_houseNo`, `driver_postalCode`, `driver_address`, `driver_license_no`, `id`, `driver_firstName`, `driver_lastName`, `driver_status`) VALUES
('3456789012', '1992-11-20', 'Surma R 7', '3100', 'Sylhet', '345678901234567', 11, 'Ayesha', 'Akteer', 1),
('4567890123', '1988-02-25', 'Karnaphuli B 9', '6000', 'Sylhet', '456789012345678', 12, 'Nazia', 'Khan', 1),
('6789012345', '1991-09-05', ' Padma A 14', '2200', ' Pirojpur', '678901234567890', 14, 'Nusrat', 'Islam', 0),
('7890123456', '1985-03-30', 'Chompa D 33', '3300', 'Comilla', '789012345678901', 15, 'Munira', 'Haque', 0),
('8901234567', '1994-07-12', 'Doyel L 2', '9000', 'Dinajpur', '890123456789012', 16, 'Samir', 'Rahman', 1),
('9012345678', '1980-12-08', 'Meghna S 8', '1200', 'Narayanganj', '901234567890123', 17, 'Sadia', 'Sultana', 0),
('0123456789', '1983-05-18', 'Rajia F 6', '5500', 'Rangpur', '012345678901234', 18, 'Imran', 'Ali', 0);

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
('6789012345', '201983104420198315', '20198310442019831549', '1975-09-05', 'Meghna D 14', '7000', 'Khulna', 14, 'Suman', 'Haque', 1),
('7890123456', '201983104420198316', '20198310442019831640', '1987-07-30', 'Mohona B 33', '3300', 'Comilla', 15, 'Taijul', 'Islam', 1),
('8901234567', '201983104420198317', '20198310442019831741', '1994-04-12', 'Jamuna L 2', '1200', 'Narayanganj', 16, 'Asif', 'Islam', 1),
('9012345678', '201983104420198318', '20198310442019831842', '1983-12-08', 'Meghna F 8', '5000', 'Sylhet', 17, 'Faruk', 'Aziz', 1),
('0123456789', '201983104420198319', '20198310442019831943', '1970-06-18', 'Akhalia H 6', '9000', 'Dinajpur', 18, 'Nahid', 'Hossain', 1),
('1190601312', '123123123111906013', '12312312311190601322', '1999-10-02', 'RUET Campus', '2000', 'Gopalganj', 19, 'Hasib', 'Hasan Rafi', 1),
('9765432122', '123451234512345123', '12345123451234512345', '2000-11-01', 'Amlapara', '1400', 'Nowabganj', 20, 'Sujoy', 'Karmakar', 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_amount` varchar(255) NOT NULL,
  `payment_date` varchar(10) NOT NULL,
  `driver_nid` varchar(17) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_amount`, `payment_date`, `driver_nid`) VALUES
(1, '25', '2023-10-30', '8901234567'),
(2, '25', '2023-10-30', '8901234567'),
(3, '25', '2023-10-30', '9012345678'),
(4, '25', '2023-10-30', '6789012345');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(253) NOT NULL,
  `schedule_date` varchar(254) NOT NULL,
  `schedule_round` varchar(254) NOT NULL,
  `schedule_serial` varchar(254) NOT NULL,
  `schedule_time` varchar(254) NOT NULL,
  `schedule_autorickshaw` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `schedule_date`, `schedule_round`, `schedule_serial`, `schedule_time`, `schedule_autorickshaw`) VALUES
(18, '2023-10-28', '1', '1', '11:30', '110'),
(19, '2023-10-28', '1', '2', '11:35', '23'),
(20, '2023-10-28', '1', '3', '11:40', '34'),
(21, '2023-10-28', '1', '4', '11:50', '45'),
(24, '2023-10-29', '1', '12', '11:11', '23'),
(25, '2023-10-29', '1', '13', '10:11', '77'),
(26, '2023-10-29', '1', '13', '10:11', '77');

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
  `admin_NID` varchar(30) NOT NULL,
  `authority_adminType` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `admin_NID`, `authority_adminType`) VALUES
(135, 'Dr. Mohammad Reza Selim', 'Mohammad5525', 'Mohammad5525', '8708132650', 'কর্তৃপক্ষ'),
(136, 'Marium-E-Jannat', 'MariumEJannat4104', 'MariumEJannat4104', '8032825929', 'কর্তৃপক্ষ'),
(137, 'Mohammad Abdullah Al Mumin', 'Mohammad@466', 'Mohammad@466', '9820029306', 'কর্তৃপক্ষ'),
(138, 'Mohammad Shahidur Rahman', 'Mohammad4657', 'Mohammad4657', '8717259377', 'কর্তৃপক্ষ');

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
  ADD KEY `driver_nid` (`driver_nid`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(253) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `serial`
--
ALTER TABLE `serial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`driver_nid`) REFERENCES `driver` (`driver_nid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
