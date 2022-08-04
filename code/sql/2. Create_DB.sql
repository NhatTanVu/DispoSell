USE disposelldb;

-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2022 at 09:42 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `disposelldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `deliveryID` bigint(20) NOT NULL,
  `currentLocation` varchar(255) DEFAULT NULL,
  `endLocation` varchar(255) DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `startLocation` varchar(255) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `vehicleNumber` varchar(255) DEFAULT NULL,
  `vehicleType` varchar(255) DEFAULT NULL,
  `orderID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `orderID` bigint(20) NOT NULL,
  `productID` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` bigint(20) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `contactNumber` varchar(20) DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(150) DEFAULT NULL,
  `isPurchaseOrder` bit(1) NOT NULL,
  `lastName` varchar(150) DEFAULT NULL,
  `orderedDate` datetime NOT NULL,
  `scheduledDate` datetime DEFAULT NULL,
  `statusID` bigint(20) NOT NULL,
  `userID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderstatuses`
--

CREATE TABLE `orderstatuses` (
  `statusID` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderstatuses`
--

INSERT INTO `orderstatuses` (`statusID`, `name`) VALUES
(1, 'ORDER_STATUS_NEW'),
(2, 'ORDER_STATUS_APPROVED'),
(3, 'ORDER_STATUS_REJECTED'),
(4, 'ORDER_STATUS_PAID'),
(5, 'ORDER_STATUS_SCHEDULED'),
(6, 'ORDER_STATUS_IN_DELIVERY'),
(7, 'ORDER_STATUS_DONE'),
(8, 'ORDER_STATUS_CANCELLED');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `categoryID` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`categoryID`, `name`) VALUES
(1, 'Bed Frames'),
(2, 'Chairs'),
(3, 'Dining Tables'),
(4, 'Side Tables'),
(5, 'Sofas'),
(6, 'Stools');

-- --------------------------------------------------------

--
-- Table structure for table `productconditions`
--

CREATE TABLE `productconditions` (
  `conditionID` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productconditions`
--

INSERT INTO `productconditions` (`conditionID`, `name`) VALUES
(1, 'PRODUCT_CONDITION_UNUSED'),
(2, 'PRODUCT_CONDITION_VERY_GOOD'),
(3, 'PRODUCT_CONDITION_GOOD'),
(4, 'PRODUCT_CONDITION_FAIR');

-- --------------------------------------------------------

--
-- Table structure for table `productmedia`
--

CREATE TABLE `productmedia` (
  `id` bigint(20) NOT NULL,
  `fileType` varchar(30) DEFAULT NULL,
  `isDefault` bit(1) NOT NULL,
  `publishedDate` datetime DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `productID` bigint(20) NOT NULL,
  `publisherID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productmedia`
--

INSERT INTO `productmedia` (`id`, `fileType`, `isDefault`, `publishedDate`, `url`, `productID`, `publisherID`) VALUES
(1, 'jpeg', b'1', NULL, '/images/products/4.jpeg', 1, NULL),
(2, 'jpeg', b'1', NULL, '/images/products/3.jpeg', 2, NULL),
(3, 'jpg', b'1', NULL, '/images/products/2.jpg', 3, NULL),
(4, 'jpeg', b'0', '2022-07-30 08:49:11', '/images/products/5.jpeg', 3, 1),
(5, 'jpeg', b'1', NULL, '/images/products/1.jpeg', 4, NULL),
(6, 'jpg', b'0', NULL, '/images/products/stools.jpg', 5, NULL),
(7, 'jpg', b'1', NULL, '/images/products/stools1.jpg', 5, NULL),
(8, 'jpg', b'1', NULL, '/images/products/diningTable1.jpg', 6, NULL),
(9, 'jpg', b'0', NULL, '/images/products/diningTable2.jpg', 6, NULL),
(10, 'jpg', b'1', NULL, '/images/products/diningTable3.jpg', 7, NULL),
(11, 'jpg', b'0', NULL, '/images/products/diningTable4.jpg', 7, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` bigint(20) NOT NULL,
  `actualCost` float DEFAULT NULL,
  `approvedDate` datetime DEFAULT NULL,
  `availableQuantity` int(11) NOT NULL,
  `color` varchar(20) DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `estimatedCost` float DEFAULT NULL,
  `estimatedPrice` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `material` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `publishedDate` datetime DEFAULT NULL,
  `sellingPrice` float DEFAULT NULL,
  `verifiedDate` datetime DEFAULT NULL,
  `width` float DEFAULT NULL,
  `approverID` bigint(20) DEFAULT NULL,
  `categoryID` bigint(20) DEFAULT NULL,
  `conditionID` bigint(20) NOT NULL,
  `publisherID` bigint(20) DEFAULT NULL,
  `verifierID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `actualCost`, `approvedDate`, `availableQuantity`, `color`, `credit`, `description`, `estimatedCost`, `estimatedPrice`, `height`, `length`, `material`, `name`, `publishedDate`, `sellingPrice`, `verifiedDate`, `width`, `approverID`, `categoryID`, `conditionID`, `publisherID`, `verifierID`) VALUES
(1, NULL, '2022-07-30 08:49:11', 8, NULL, NULL, 'Description 1', NULL, NULL, NULL, NULL, NULL, 'white side table', '2013-10-21 12:15:22', 30, NULL, NULL, 1, 4, 1, NULL, NULL),
(2, NULL, NULL, 15, NULL, NULL, 'Description 2', NULL, NULL, NULL, NULL, NULL, 'thin white bed frame', '2014-10-21 12:15:22', 100.99, NULL, NULL, NULL, 1, 1, NULL, NULL),
(3, NULL, '2022-07-30 08:49:11', 39, NULL, NULL, 'Description 3', NULL, NULL, NULL, NULL, NULL, 'off white folding chair', '2015-10-21 12:15:22', 20.49, NULL, NULL, 1, 2, 1, NULL, NULL),
(4, NULL, NULL, 50, NULL, NULL, 'Description 4', NULL, NULL, NULL, NULL, NULL, 'light gray lounge sofa', '2016-10-21 12:15:22', 99.9, NULL, NULL, 1, 5, 1, NULL, NULL),
(5, NULL, NULL, 9, NULL, NULL, 'Description 5', NULL, NULL, NULL, NULL, NULL, 'bar stools', '2017-10-21 12:15:22', 149, NULL, NULL, NULL, 6, 1, NULL, NULL),
(6, NULL, NULL, 1, NULL, NULL, 'Description 6', NULL, NULL, NULL, NULL, NULL, 'extendable dining table', '2018-10-21 12:15:22', 579, NULL, NULL, NULL, 3, 1, NULL, NULL),
(7, NULL, NULL, 4, NULL, NULL, 'Description 7', NULL, NULL, NULL, NULL, NULL, 'round dining table', '2019-10-21 12:15:22', 449, NULL, NULL, NULL, 3, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorders`
--

CREATE TABLE `purchaseorders` (
  `paymentAmount` float DEFAULT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `paymentTransactionID` varchar(255) DEFAULT NULL,
  `orderID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_ADMINISTRATOR'),
(2, 'ROLE_SHIPPER'),
(3, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `shipperdeliveries`
--

CREATE TABLE `shipperdeliveries` (
  `deliveryID` bigint(20) NOT NULL,
  `shipperID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tradeorders`
--

CREATE TABLE `tradeorders` (
  `confirmedDate` datetime DEFAULT NULL,
  `orderID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `userID` bigint(20) NOT NULL,
  `roleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`userID`, `roleID`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `TotalCredit` float DEFAULT NULL,
  `avatarUrl` varchar(250) DEFAULT NULL,
  `contactAddress` varchar(250) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(150) DEFAULT NULL,
  `lastName` varchar(150) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `TotalCredit`, `avatarUrl`, `contactAddress`, `email`, `firstName`, `lastName`, `password`, `phoneNumber`, `username`) VALUES
(1, NULL, 'test_admin avatar.png', '1234 Some Street, Vancouver, BC, V5L 2A5', 'test_admin@gmail.com', 'Test', 'Admin', '$2a$10$tqHXLDJNMtByKiI5ZHhoRO4OztGnVus2E9U3lb41fvIwxT0FfCRpy', '123456789', 'test_admin'),
(2, NULL, 'test_shipper avatar.png', '2345 Some Street, New Westminster, BC, V5L 2A5', 'test_shipper@gmail.com', 'Test', 'Shipper', '$2a$10$zWKLO1ltXxEdJis99SlbEeSihOokRSqEQmCmB668j/nuvTxDbkoZO', '987654321', 'test_shipper');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`deliveryID`),
  ADD KEY `FKkcpjq3x1dqjhhwwj3pb4tvt0m` (`orderID`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`orderID`,`productID`),
  ADD KEY `FKdb40gpkyh4g517xxhdowdg8r9` (`productID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `FKahxcth9tn73ecp6jl6dgeeijk` (`statusID`),
  ADD KEY `FKsormnl71n877jtygkmn86d4cm` (`userID`);

--
-- Indexes for table `orderstatuses`
--
ALTER TABLE `orderstatuses`
  ADD PRIMARY KEY (`statusID`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `productconditions`
--
ALTER TABLE `productconditions`
  ADD PRIMARY KEY (`conditionID`);

--
-- Indexes for table `productmedia`
--
ALTER TABLE `productmedia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKns21tl4te4co0icq76hjh7biq` (`productID`,`url`),
  ADD KEY `FKlwndjc4ba34376an7n0eppoxd` (`publisherID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `FKe8s9yhutjixthqbscirdy6v3i` (`approverID`),
  ADD KEY `FKid4s95jden2nhfqg4hkloune2` (`categoryID`),
  ADD KEY `FKsg1gm93kquwlid0xmcf0xlpmt` (`conditionID`),
  ADD KEY `FKiryu5ab4yyffq0oq3d0ronvvc` (`publisherID`),
  ADD KEY `FKlm5mmeqshw7s091mwxvwlnvpn` (`verifierID`);

--
-- Indexes for table `purchaseorders`
--
ALTER TABLE `purchaseorders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipperdeliveries`
--
ALTER TABLE `shipperdeliveries`
  ADD PRIMARY KEY (`deliveryID`,`shipperID`),
  ADD KEY `FKpwkqu6o0lpca4ioeqppwnq0px` (`shipperID`);

--
-- Indexes for table `tradeorders`
--
ALTER TABLE `tradeorders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`userID`,`roleID`),
  ADD KEY `FKg6dgq5t667e0rx1af94y94ua7` (`roleID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `deliveryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `orderstatuses`
--
ALTER TABLE `orderstatuses`
  MODIFY `statusID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `productcategories`
--
ALTER TABLE `productcategories`
  MODIFY `categoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `productconditions`
--
ALTER TABLE `productconditions`
  MODIFY `conditionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productmedia`
--
ALTER TABLE `productmedia`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `FKkcpjq3x1dqjhhwwj3pb4tvt0m` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `FK1d9k6mrn9q9qgpusmyb30f1yr` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  ADD CONSTRAINT `FKdb40gpkyh4g517xxhdowdg8r9` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKahxcth9tn73ecp6jl6dgeeijk` FOREIGN KEY (`statusID`) REFERENCES `orderstatuses` (`statusID`),
  ADD CONSTRAINT `FKsormnl71n877jtygkmn86d4cm` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `productmedia`
--
ALTER TABLE `productmedia`
  ADD CONSTRAINT `FK2i78e1dquy4ktkmuixisadcn6` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `FKlwndjc4ba34376an7n0eppoxd` FOREIGN KEY (`publisherID`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKe8s9yhutjixthqbscirdy6v3i` FOREIGN KEY (`approverID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKid4s95jden2nhfqg4hkloune2` FOREIGN KEY (`categoryID`) REFERENCES `productcategories` (`categoryID`),
  ADD CONSTRAINT `FKiryu5ab4yyffq0oq3d0ronvvc` FOREIGN KEY (`publisherID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKlm5mmeqshw7s091mwxvwlnvpn` FOREIGN KEY (`verifierID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKsg1gm93kquwlid0xmcf0xlpmt` FOREIGN KEY (`conditionID`) REFERENCES `productconditions` (`conditionID`);

--
-- Constraints for table `purchaseorders`
--
ALTER TABLE `purchaseorders`
  ADD CONSTRAINT `FK8tg0tyxtxeohjdcye6nr3imq4` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);

--
-- Constraints for table `shipperdeliveries`
--
ALTER TABLE `shipperdeliveries`
  ADD CONSTRAINT `FKpwkqu6o0lpca4ioeqppwnq0px` FOREIGN KEY (`shipperID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKw2uwpnekfiqb1su37593sksf` FOREIGN KEY (`deliveryID`) REFERENCES `deliveries` (`deliveryID`);

--
-- Constraints for table `tradeorders`
--
ALTER TABLE `tradeorders`
  ADD CONSTRAINT `FKotfaempioiqdbtqk9olefoaj2` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);

--
-- Constraints for table `userroles`
--
ALTER TABLE `userroles`
  ADD CONSTRAINT `FKg6dgq5t667e0rx1af94y94ua7` FOREIGN KEY (`roleID`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKgs3lveox6td3wt5tkl77gacua` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);
COMMIT;
