-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: demodb
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('f132689e5ebe');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `math`
--

DROP TABLE IF EXISTS `math`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `math` (
  `id` int(10) NOT NULL,
  `question_content` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `math`
--

LOCK TABLES `math` WRITE;
/*!40000 ALTER TABLE `math` DISABLE KEYS */;
INSERT INTO `math` VALUES (1,' The potential energy of a particle of mass  at a distance  from a fixed point  is given by () = 2/2, where  is a positive constant of appropriate dimensions. This particle is moving in a circular orbit of radius  about the point . If  is the speed of the particle and is the magnitude of its angular momentum about , which of the following statements is(are) true?');
/*!40000 ALTER TABLE `math` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `date_posted` datetime NOT NULL,
  `content` text NOT NULL,
  `post_image_file` varchar(30) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'1st Post','2019-01-06 06:55:59','Hello',NULL,1),(2,'1st Post','2019-01-06 06:56:35','Hello',NULL,1),(3,'1st Post','2019-01-06 22:48:35','ndnd',NULL,1),(4,'Sunils Post ','2019-01-07 09:03:03','Hello Everyone',NULL,1),(5,'Rajesh\'s First Post','2019-01-07 09:05:14','Hello All. This is Rajesh.','bae0a43f51fa996d.png',3),(6,'sds','2019-01-08 01:11:39','dsdsd',NULL,5),(7,'1st Post','2019-01-08 22:29:50','dfswfwds',NULL,5);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_content` varchar(500) NOT NULL,
  `a` varchar(100) NOT NULL,
  `b` varchar(100) NOT NULL,
  `c` varchar(100) NOT NULL,
  `d` varchar(100) NOT NULL,
  `ans` varchar(100) NOT NULL,
  `positive_marks` int(11) NOT NULL,
  `negative_marks` int(11) NOT NULL,
  `date_posted` datetime NOT NULL,
  `section` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Is there something else better than Python','Linus','Tiger','Lion','Man','Sunil',3,1,'2019-01-09 01:53:28',''),(2,'Is there something else better than Python','Linus','Tiger','Lion','Man','Sunil',3,1,'2019-01-09 01:54:59',''),(3,'Is there something else better than Python','Linus','Tiger','Lion','Man','Sunil',3,1,'2019-01-09 01:56:00',''),(4,'Is there something else better than Python','Linus','Tiger','Lion','Man','Sunil',3,1,'2019-01-09 01:58:09',''),(5,'Chekkey Be','Linus','Tiger','Lion','Man','Sunil',3,1,'2019-01-09 01:58:38',''),(6,'Ra Ra Chuskundam','Linus','Tiger','Lion','Man','Sunil',3,1,'2019-01-09 02:00:10',''),(7,'Ra Ra Chuskundam Ne Balayya','90','jkjd','ndkkd','jkaj','jfkfjq',90,90,'2019-01-09 02:01:22',''),(8,'Nuvvu ne Balayya','89','80','77','898','MyAns',90,89,'2019-01-09 02:02:30',''),(9,'jjyjyj','jyjy','jyjyjy','jyjyj','yjyj','jyjy',90,90,'2019-01-09 02:04:11',''),(10,'Pill rA','1','e','3','4','3',2,3,'2019-01-09 02:05:44',''),(11,'Pill rA','1','e','3','4','3',3,1,'2019-01-09 02:06:31','Maths'),(12,'Is there something else better than Python','Cat','Tiger','Lion','yjyj','jfkfjq',3,1,'2019-01-09 02:36:09','Physics'),(13,'3rd Question','Hello','No','Yes','Maybe','Yes',3,1,'2019-01-09 04:44:04','Chemistry'),(14,'This is the 4th Question','ans1','ans2','ans3','ans4','ans2',3,1,'2019-01-09 04:44:35','Maths'),(15,'Who is the coolest Music Composer','DeviSri','Hans Zimmer','A.R.Rahman','Anirudh Ravichander','A.R.Rahman',3,1,'2019-01-09 07:16:20','Physics'),(16,'Question of Pure Test 229','1','2','3','4','4',3,1,'2019-01-09 10:42:31',''),(17,'My heart My soul','1','2','c','d','d',3,1,'2019-01-09 10:43:43',''),(18,'What is the capital of Argentina','Sucre','Buenes Aires','Ottawa','Lima','Buenes Aires',3,1,'2019-01-10 02:23:08',''),(19,'Hahha is it never enough','yes','mess','no','comeon','no',3,1,'2019-01-10 04:23:50','Physics'),(20,'Somewhat Better','Yes','No ','Maybe','GetLost','No',3,1,'2019-01-14 06:23:04','math'),(21,'1st Question','a','b','c','d','d',3,1,'2019-01-16 01:05:17','Maths'),(22,'Is there something else better than Python','a','b','c','d','d',3,1,'2019-01-16 01:15:50','Maths'),(23,'Chekkey Be','a','Tiger','ndkkd','Damn','a',90,89,'2019-01-16 01:17:17','Maths'),(24,'Chekkey Be','a','Tiger','Lion','Azhar','a',3,1,'2019-01-16 01:22:25','Maths'),(25,'Chekkey Be','a','b','c','d','d',3,1,'2019-01-16 08:52:21','Maths'),(26,'Ra Ra Chuskundam','a','b','c','d','d',3,1,'2019-01-16 08:53:53','Maths'),(27,'Ra Ra Chuskundam','a','b','c','d','d',3,1,'2019-01-16 08:56:24','Maths'),(28,'Test question for admin Modulle','a','b','c','d','d',3,1,'2019-01-19 03:37:33','Physics'),(29,'Question added to Saroja\'s Test ?','a','b','c','d','a',3,1,'2019-01-19 04:57:37','Maths'),(30,'Pagati Veshagallu ante evaru','nuv a ','sunil','jujju','yavvan','yavvan',3,1,'2019-01-26 00:28:34','Maths'),(31,'Nuvvu ne Balayya','a','Tiger','Lion','Man','Lion',3,1,'2019-01-26 00:29:04','Maths'),(32,'What is the positive prime number','4','2','3','9','2',3,1,'2019-01-26 07:04:17','Maths'),(33,'What is the value of g, in the context of Newton\'s Laws of Gravitation.','10','9.8','23','6.8','9.8',3,1,'2019-01-26 07:05:17','Physics'),(34,'What is the Chemical Formula of common Alchohol','Ch3COOH','COOH','CH2CH3COOH','CH2COOH','Ch3COOH',3,1,'2019-01-26 07:06:16','Chemistry'),(35,'Maths q2','a','b','c','d','d',3,1,'2019-01-26 07:07:45','Maths'),(36,'Maths q 3','1','2','3','4','1',3,1,'2019-01-26 07:08:07','Maths'),(37,'Physics Q3','a','b','c','d','c',3,1,'2019-01-26 07:09:18','Physics'),(38,'Chem q3','a','b','c','d','d',3,1,'2019-01-26 07:09:36','Maths'),(39,'Maths q7','1','2','3','4','3',3,1,'2019-01-26 07:09:56','Maths'),(40,'Physics q6','a','b','c','d','d',3,1,'2019-01-26 07:10:16','Maths'),(41,'Physics q8','a','b','c','d','d',3,1,'2019-01-26 07:10:37','Maths'),(42,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:41','Maths'),(43,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:43','Maths'),(44,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:46','Maths'),(45,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:49','Maths'),(46,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:50','Maths'),(47,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:51','Maths'),(48,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:52','Maths'),(49,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:52','Maths'),(50,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:53','Maths'),(51,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:53','Maths'),(52,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:54','Maths'),(53,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:54','Maths'),(54,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:55','Maths'),(55,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:55','Maths'),(56,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:56','Maths'),(57,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:56','Maths'),(58,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:57','Maths'),(59,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:57','Maths'),(60,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:58','Maths'),(61,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:58','Maths'),(62,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:49:59','Maths'),(63,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:00','Maths'),(64,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:01','Maths'),(65,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:01','Maths'),(66,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:02','Maths'),(67,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:02','Maths'),(68,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:03','Maths'),(69,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:04','Maths'),(70,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:04','Maths'),(71,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:05','Maths'),(72,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:06','Maths'),(73,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:07','Maths'),(74,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:08','Maths'),(75,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:08','Maths'),(76,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:09','Maths'),(77,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:10','Maths'),(78,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:10','Maths'),(79,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:11','Maths'),(80,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:11','Maths'),(81,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:12','Maths'),(82,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:12','Maths'),(83,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:13','Maths'),(84,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:13','Maths'),(85,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:14','Maths'),(86,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:15','Maths'),(87,'In the -plane, the region  > 0 has a uniform magnetic field 1 and the region  < 0 has\nanother uniform magnetic field 2. A positively charged particle is projected from the\norigin along the positive -axis with speed 0 =   \n1\nat  = 0, as shown in the figure.\nNeglect gravity in this problem. Let  =  be the time when the particle crosses the -axis\nfrom below for the first time. If 2 = 41, the av','Karl Marx','Dr.B.R.Ambedkar','Joseph Stalin','Periyar Ramaswamy','Dr.B.R.Ambedkar',3,1,'2019-01-31 20:50:18','Maths');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` varchar(100) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `no_of_questions` int(11) NOT NULL,
  `total_marks` int(11) NOT NULL,
  `time_in_mins` int(11) NOT NULL,
  `date_posted` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `instructions` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `test_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (9,'Monday Test','IIT-JEE',89,18,180,'2019-01-09 01:48:27',5,'1. Click on the radio button out of the 4 options to answer a question. <br />2. To de-select an answer, click on the answered radio button.<br /> 3. You will see \'Reached the end of the test\', after the last question of the test.</br> 4.Time is indication in the top right corner for the test.</br> 5.Test will auto submit once, time is up. 6.All the Best.'),(10,'Test2','IIT-JEE',10,100,100,'2019-01-14 06:18:53',6,'1. Inst1\r\n2.Inst 2'),(11,'Sunils Test','IIT-JEE',89,980,180,'2019-01-14 10:03:28',1,'dsdsd'),(12,'Linus Test','IIT-JEE',10,100,180,'2019-01-16 01:04:46',1,'1.Hello.\r\n2.All the Best\r\n3.No matter where you are.'),(13,'Holiday Test','IIT-JEE',10,100,180,'2019-01-16 01:14:11',1,'1.Sunil\r\n2.Hello Linus\r\n3.All the Best Bro\r\n4.PRathi Janma'),(14,'Comedy Test','IIT-JEE',10,100,180,'2019-01-16 01:15:26',1,'<br>.Linus is the Best.\r\n<br>.Ravindra is the Coolest\r\n<br>.Jujju is the Awesome.\r\n<br>.All of us are gonna Rock.'),(15,'Final Test for Test','IIT-JEE',89,980,890,'2019-01-16 01:16:58',1,'<br>\\d.Inst<br>\\d\r\n<br>\\d.Inst<br>\\d\r\n<br>\\d.Inst<br>\\d\r\n<br>\\d.Inst<br>\\d'),(16,'Shravanti\'s Test ','IIT-JEE',10,100,200,'2019-01-16 01:22:08',1,'<br>\\d.Hello\r\n<br>\\d.Rhinoceroes\r\n<br>\\d.Ramama\r\n<br>\\d.Jesus NMa'),(17,'Sunils Test Final','IIT-JEE',10,380,100,'2019-01-16 01:36:17',1,'<br>\\d.Hello.\r\n<br>\\d.Mama.\r\n<br>\\d.Africa\r\n<br>\\d.Cambodia'),(18,'Sample','IIT-JEE',90,980,90,'2019-01-16 01:42:25',1,'1.Hello.\r<br>2.Python\r<br>3.Rhino\r<br>4.Buffaloe'),(19,'Sample Hello','IIT-JEE',90,980,90,'2019-01-16 01:43:24',1,'1.Hello.\r<br>2.Python\r<br>3.Rhino\r<br>4.Buffaloe'),(20,'Sample Hello Ra','IIT-JEE',90,980,90,'2019-01-16 01:43:58',1,'1.Hello.\r<br>2.Python\r<br>3.Rhino\r<br>4.Buffaloe'),(21,'Sample Hello Ra Ra','IIT-JEE',90,980,90,'2019-01-16 01:44:40',1,'1.Hello.\r<br>2.Python\r<br>3.Rhino\r<br>4.Buffaloe'),(22,'Sample Hello Ra Ra Ra','IIT-JEE',90,980,90,'2019-01-16 01:47:16',1,'1.Hello.\r\n2.Python\r\n3.Rhino\r\n4.Buffaloe'),(23,'Sample Hello Ra Ra Ra Ra','IIT-JEE',90,980,90,'2019-01-16 01:48:26',1,'1.Hello.\r\n2.Python\r\n3.Rhino\r\n4.Buffaloe'),(24,' Sample Hello Ra Ra Ra RaSSA','IIT-JEE',90,980,90,'2019-01-16 01:50:23',1,'1.Hello.\r\n2.Python\r\n3.Rhino\r\n4.Buffaloe'),(25,' Sample Hello Ra Ra Ra RaSSA sas','IIT-JEE',90,980,90,'2019-01-16 08:50:27',1,'1.Hello.\r\n2.Python\r\n3.Rhino\r\n4.Buffaloe'),(26,'Final Test for Instructions','IIT-JEE',10,100,100,'2019-01-16 08:51:58',1,'1.Hello Sunil.\r\n2.You are too terific.\r\n3.Lets rock the Start up world.\r\n4.All the very best.'),(27,'Ra Ra Test','IIT-JEE',10,100,100,'2019-01-16 08:53:31',1,'1.Hello Sunil. <br>2.You are too terific. <br>3.Lets rock the Start up world. <br>4.All the very best.'),(28,'Saroja\'s Kitchen Qualifying Test','Chefing',10,100,100,'2019-01-16 08:56:09',1,'1. Click on the radio button out of the 4 options to answer a question.<br>2. To de-select an answer, click on the answered radio button.<br>3. You will see \'Reached the end of the test\', after the last question of the test.<br>4.Time is indication in the top right corner for the test.<br>5.Test will auto submit once, time is up.<br>6.All the Best.'),(29,'Sunday Test','IIT-JEE',30,300,180,'2019-01-26 00:27:58',1,'1.Inst1.<br>2.Inst2<br>3.Inst4<br>5.Int4'),(30,'Final Test for Final Testing','IIT-JEE',10,100,180,'2019-01-26 07:03:45',1,'1.Inst1.<br>2.Inst2.<br>3.Inst3.<br>4.Inst4.<br>5.Inst5');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_question`
--

DROP TABLE IF EXISTS `test_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `test_id` (`test_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `test_question_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  CONSTRAINT `test_question_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_question`
--

LOCK TABLES `test_question` WRITE;
/*!40000 ALTER TABLE `test_question` DISABLE KEYS */;
INSERT INTO `test_question` VALUES (1,9,11),(2,9,12),(3,9,13),(4,9,14),(5,9,15),(9,9,19),(10,10,20),(11,12,21),(12,14,22),(13,15,23),(14,16,24),(15,26,25),(16,27,26),(17,28,29),(18,29,30),(19,29,31),(20,30,32),(21,30,33),(22,30,34),(23,30,35),(24,30,36),(25,30,37),(26,30,38),(27,30,39),(28,30,40),(29,30,41),(30,30,1),(31,30,42),(32,30,43),(33,30,44),(34,30,45),(35,30,46),(36,30,47),(37,30,48),(38,30,49),(39,30,50),(40,30,51),(41,30,52),(42,30,53),(43,30,54),(44,30,55),(45,30,56),(46,30,57),(47,30,58),(48,30,59),(49,30,50),(50,30,60),(51,30,61),(52,30,62),(53,30,63),(54,30,64),(55,30,65),(56,30,66),(57,30,67),(58,30,68),(59,30,69),(60,30,70),(61,30,71),(62,30,72),(63,30,73),(64,30,74),(65,30,75),(66,30,76),(67,30,77),(68,30,78),(69,30,79),(70,30,80),(71,30,81),(72,30,82),(73,30,83),(74,30,84),(75,30,85),(76,30,86),(77,30,87);
/*!40000 ALTER TABLE `test_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `image_file` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_admin` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'msunilhyd','msunilhyd@gmail.com','default.jpg','$2b$12$547MblpnnwFAWmAILK7HLeKZai8lbHJdUGMQV1b.OijtaXYtiCXXC',1),(2,'pandu','pandu@gmail.com','default.jpg','$2b$12$R1gj2leUAAsJsOqY917ZkOwFErfgROmXxHOz/YwUw3R0NcYChjRPu',0),(3,'rajesh','rajesh@gmail.com','default.jpg','$2b$12$pOwuj9QW9NYgLu8Id05dkeB5Y0XaLk3.nloHw5/F3dvzqzXnckBy2',0),(4,'suresh','suresh@gmail.com','default.jpg','$2b$12$aV6vj6FkOwDm85lF/zxCVeqxVjVcjD81Veli.JyoeFVm7Aw43IfC2',0),(5,'zakir','zakir@gmail.com','default.jpg','$2b$12$RCToLLD/nd13vFQjv5zEouWyFc.NLs8Vae9bRS1Avrlp4dujDeOAu',0),(6,'bob','b@b.com','default.jpg','$2b$12$tyIg9o4uDosSBLLv1i0ZEuVO1PZK1VOImH97SjE2b20vZxw3fwLMq',1),(7,'cusee','c@c.com','default.jpg','$2b$12$I5FBFcHSoZnnFMSsF/ZunOEPjdf1RYPYI9nMnQ3zoInyUVYiytZRK',0),(8,'aob','a@a.com','default.jpg','$2b$12$DMimILvWZewCHAJgQFgxAe/iQHPeoYLPfersSPG4ikuFDrFcTphWO',0),(9,'duser','d@d.com','default.jpg','$2b$12$HyWxFOpvDMYRmf0BozpBtOYeZNdB60FMl4fF/5RE2qtmPOqpvKd.q',0),(10,'msarojahyd','msarojahyd@gmail.com','default.jpg','$2b$12$GJy0yk128gREo7o.apezje9uGq08IJ5b1B38m6oehN1B/5IGkxFWu',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_test`
--

DROP TABLE IF EXISTS `user_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_score` int(11) NOT NULL,
  `correct_answers` int(11) NOT NULL,
  `negative_score` int(11) NOT NULL,
  `no_answers` int(11) NOT NULL,
  `positive_score` int(11) NOT NULL,
  `test_taken_on_date` datetime NOT NULL,
  `wrong_answers` int(11) NOT NULL,
  `attempted_ques` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `test_id` (`test_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_test_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  CONSTRAINT `user_test_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_test`
--

LOCK TABLES `user_test` WRITE;
/*!40000 ALTER TABLE `user_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_test` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-05  4:03:39
