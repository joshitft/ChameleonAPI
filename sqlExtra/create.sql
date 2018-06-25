
 CREATE TABLE `chameleon`.`profiles` (
  `id` INT  AUTO_INCREMENT,
  `alias` VARCHAR(250) ,
  `firstName` VARCHAR(250) ,
  `lastName` VARCHAR(250) ,
  `gender` VARCHAR(10) ,
  `email` VARCHAR(250) ,
  `cellularNumber` VARCHAR(250) ,
  `country` VARCHAR(250) ,
  `city` VARCHAR(250) ,
  `zipCode` VARCHAR(250) ,
  `industry` VARCHAR(250) ,
  `currentPosition` VARCHAR(250) ,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);
 CREATE TABLE `chameleon`.`posts` (
  `id` INT  AUTO_INCREMENT,
  `profileId` INT,
  `content` TEXT ,
  `imageLink` VARCHAR(250),
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);
 CREATE TABLE `chameleon`.`comments` (
  `id` INT  AUTO_INCREMENT,
  `postId` INT ,
  `profileId` INT,
  `content` TEXT ,
  `removedAt` DATETIME DEFAULT NULL,
  `createdAt` DATETIME ,
  `updatedAt` DATETIME ,
  PRIMARY KEY (`id`)
);








