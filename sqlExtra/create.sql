CREATE DATABASE `chameleon`;

 CREATE TABLE `chameleon`.`profiles` (
  `id` INT  AUTO_INCREMENT ,
  `name` VARCHAR(250) ,
  `firstName` VARCHAR(250) ,
  `lastName` VARCHAR(250) ,
  `picture` VARCHAR(250),
  `gender` VARCHAR(10) ,
  `email` VARCHAR(250) UNIQUE,
  `cellularNumber` VARCHAR(250) ,
  `country` VARCHAR(250) ,
  `city` VARCHAR(250) ,
  `zipCode` VARCHAR(250) ,
  `industry` VARCHAR(250) ,
  `nickname` VARCHAR(250),
  `provider` VARCHAR(250),
  `userAuthId` VARCHAR(250),
  `currentPosition` VARCHAR(250) ,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

 CREATE TABLE `chameleon`.`authLogins` (
  `id` VARCHAR(250),
  `profileId` INT NOT NULL,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

 CREATE TABLE `chameleon`.`posts` (
  `id` INT  AUTO_INCREMENT,
  `profileId` INT NOT NULL,
  `content` TEXT ,
  `attachmentId` INT,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

--CREATE TABLE `chameleon`.`reactionTypes` (
--  `id` INT  AUTO_INCREMENT,
--  `name` VARCHAR(250) NOT NULL,
--  `createdAt` DATETIME ,
--  `updatedAt` DATETIME ,
--  PRIMARY KEY (`id`)
--);

CREATE TABLE `chameleon`.`postReactions` (
  `id` INT  AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `profileId` INT NOT NULL,
  `reactionTypeId` INT NOT NULL,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

CREATE TABLE `chameleon`.`comments` (
  `id` INT  AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `profileId` INT NOT NULL,
  `content` TEXT NOT NULL,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

CREATE TABLE `chameleon`.`shares` (
  `id` INT  AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `profileId` INT NOT NULL,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

 CREATE TABLE `chameleon`.`followings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `follower` INT NOT NULL,
  `following` INT NOT NULL,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);

CREATE TABLE `chameleon`.`attachments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fileName` VARCHAR(300) NOT NULL,
  `fileType` VARCHAR(100),
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);


