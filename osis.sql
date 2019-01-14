-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2018 at 07:32 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `osis`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `auth` (IN `nama` VARCHAR(255), IN `password` VARCHAR(255))  NO SQL
BEGIN
	SELECT * FROM `user` WHERE `user`.`nama` = nama AND `user`.`password` = MD5(password);
    UPDATE `user` SET `user`.`isonline` = 1 WHERE `user`.`nama` = nama;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deauth` (IN `id` INT)  NO SQL
UPDATE `user` SET `isonline` = '0' WHERE `user`.`id` = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getJumlahPemilih` (IN `id` INT)  NO SQL
SELECT `ketua_stat`.`jumlah` FROM `ketua_stat` WHERE `ketua_stat`.`idketua` = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getp` (IN `nomor` INT)  NO SQL
SELECT COUNT(*) FROM user_pilihan WHERE user_pilihan.pilihan = nomor$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getpassword` (IN `nama` VARCHAR(255), IN `pass` VARCHAR(255))  NO SQL
BEGIN
	UPDATE `user` SET `user`.`password` = MD5(pass) WHERE `user`.`nama` = nama;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getstatPemilih` ()  NO SQL
BEGIN 
	DECLARE jumlah INT;
    DECLARE sudah INT;
    SET jumlah = (SELECT COUNT(*) FROM `user`);
    SET sudah = (SELECT COUNT(*) FROM `user` JOIN `user_pilihan` WHERE `user`.`id` = `user_pilihan`.`id_user`);
    
    SELECT sudah, jumlah - sudah AS 'belum';
    
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `looppemilih` ()  BEGIN

DECLARE x INT;
DECLARE i INT;
SET i = 1;
SET x = (SELECT COUNT(*) FROM `ketua`);

WHILE i <= x DO
	SELECT (SELECT `ketua`.`nama` FROM `ketua` WHERE `ketua`.`id` = i) AS `label`, (SELECT COUNT(*) FROM `user_pilihan` WHERE `user_pilihan`.`pilihan` = i) AS `value`;
    SET i = i+1;
END WHILE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setLock` (IN `idUser` INT)  NO SQL
UPDATE `user` SET `islock` = '1' WHERE `user`.`id` = idUser$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePemilih` (IN `idUser` INT, IN `idKetua` INT)  NO SQL
BEGIN
INSERT INTO `user_pilihan` (`id_user`, `pilihan`) VALUES (idUser, idKetua);
UPDATE `user` SET `waktu` =  NOW() WHERE `id` = idUser;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Stand-in structure for view `guser`
-- (See below for the actual view)
--
CREATE TABLE `guser` (
`id` int(10)
,`nama` varchar(50)
,`keterangan` varchar(50)
,`password` varchar(45)
,`isonline` tinyint(4)
,`islock` tinyint(4)
);

-- --------------------------------------------------------

--
-- Table structure for table `ketua`
--

CREATE TABLE `ketua` (
  `id` int(10) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `url_photo` text NOT NULL,
  `kelas` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ketua`
--

INSERT INTO `ketua` (`id`, `nama`, `url_photo`, `kelas`) VALUES
(1, 'Herman Sugiharto', 'http://localhost/img/ex.jpg', '12 IPA 4'),
(2, 'Mahmuddin Faqih Ardianto', 'http://localhost/img/ex.jpg', '12 IPA 4'),
(3, 'Riza Ahmad Septian', 'http://localhost/img/ex.jpg', '12 IPA 4'),
(4, 'Anonymous', 'http://localhost/img/ex.jpg', '12 IPA 4');

-- --------------------------------------------------------

--
-- Table structure for table `ketua_data`
--

CREATE TABLE `ketua_data` (
  `idketua` int(10) NOT NULL,
  `ttl` varchar(45) NOT NULL,
  `eskul` varchar(45) NOT NULL,
  `visi` text NOT NULL,
  `misi` longtext NOT NULL,
  `prestasi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ketua_data`
--

INSERT INTO `ketua_data` (`idketua`, `ttl`, `eskul`, `visi`, `misi`, `prestasi`) VALUES
(1, 'Cirebon, 03 November 2011', 'IT Basic', 'Mencerdaskan bangsa', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya'),
(2, 'Cirebon, 03 November 2011', 'IT Basic', 'Mencerdaskan bangsa', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya'),
(3, 'Cirebon, 03 November 2011', 'IT Basic', 'Mencerdaskan bangsa', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya'),
(4, 'Cirebon, 03 November 2011', 'IT Basic', 'Mencerdaskan bangsa', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya', 'Di dalam hidup, kita cenderung mencari senang dan nikmat. Kita\r\nberusaha menghindari semua bentuk penderitaan. Kita mau\r\napa yang kita anggap baik untuk hidup kita. Dan kita juga berusaha\r\nmenyingkirkan apa yang kita anggap jelek untuk kita.\r\nNamun, hidup tidak bisa seperti itu. Hidup tidak melulu enak,\r\nwalaupun kita berusaha untuk selalu mencari yang enak dan nikmat.\r\nHidup juga tidak selalu susah, walaupun seringkali, kita merasa\r\nbegitu. Di dalam hidup, kita tidak bisa memperoleh kenikmatan, tanpa\r\npenderitaan yang mengikutinya');

-- --------------------------------------------------------

--
-- Table structure for table `ketua_stat`
--

CREATE TABLE `ketua_stat` (
  `idketua` int(10) NOT NULL,
  `jumlah` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ketua_stat`
--

INSERT INTO `ketua_stat` (`idketua`, `jumlah`) VALUES
(1, '2');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `keterangan` varchar(50) NOT NULL,
  `password` varchar(45) NOT NULL,
  `waktu` timestamp NULL DEFAULT NULL,
  `isonline` tinyint(4) NOT NULL,
  `islock` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `keterangan`, `password`, `waktu`, `isonline`, `islock`) VALUES
(0, 'Herman Sugiharto', 'IPA 4', '20c1a26a55039b30866c9d0aa51953ca', '2018-08-11 04:01:08', 0, 1),
(1, 'Mahmuddin Faqih', 'IPA 4', '21232f297a57a5a743894a0e4a801fc3', '2018-08-11 01:13:34', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_pilihan`
--

CREATE TABLE `user_pilihan` (
  `id_user` int(10) NOT NULL,
  `pilihan` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_pilihan`
--

INSERT INTO `user_pilihan` (`id_user`, `pilihan`) VALUES
(0, 2),
(1, 1);

-- --------------------------------------------------------

--
-- Structure for view `guser`
--
DROP TABLE IF EXISTS `guser`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `guser`  AS  select `user`.`id` AS `id`,`user`.`nama` AS `nama`,`user`.`keterangan` AS `keterangan`,`user`.`password` AS `password`,`user`.`isonline` AS `isonline`,`user`.`islock` AS `islock` from `user` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ketua`
--
ALTER TABLE `ketua`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ketua_data`
--
ALTER TABLE `ketua_data`
  ADD PRIMARY KEY (`idketua`);

--
-- Indexes for table `ketua_stat`
--
ALTER TABLE `ketua_stat`
  ADD PRIMARY KEY (`idketua`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_pilihan`
--
ALTER TABLE `user_pilihan`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ketua_data`
--
ALTER TABLE `ketua_data`
  ADD CONSTRAINT `ketuadata` FOREIGN KEY (`idketua`) REFERENCES `ketua` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ketua_stat`
--
ALTER TABLE `ketua_stat`
  ADD CONSTRAINT `fk` FOREIGN KEY (`idketua`) REFERENCES `ketua` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_pilihan`
--
ALTER TABLE `user_pilihan`
  ADD CONSTRAINT `user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
